import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

	constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>) { }

	async create(createPokemonDto: CreatePokemonDto) {
		try {
			return await this.pokemonModel.create(createPokemonDto);
		}
		catch (error) {
			if (error.code === 11000) {
				throw new BadRequestException(`Pokemon already exists in db ${JSON.stringify(error.keyValue)}`);
			}

			throw new InternalServerErrorException('Cannot create pokemon. Check server logs');
		}
	}

	async findAll({ limit = 10, offset = 0 }: PaginationDTO) {
		return await this.pokemonModel.find().limit(limit).skip(offset);
	}

	async findOne(searchValue: string) {
		try {
			let pokemon: Pokemon;

			if (!isNaN(+searchValue)) {
				pokemon = await this.pokemonModel.findOne({ no: searchValue });
			}
			else if (isValidObjectId(searchValue)) {
				pokemon = await this.pokemonModel.findById(searchValue);
			}
			else {
				pokemon = await this.pokemonModel.findOne({ name: searchValue });
			}

			if (!pokemon) {
				throw new BadRequestException(`Pokemon not found ${searchValue}`);
			}

			return pokemon;
		}
		catch (error) { }
	}

	async update(searchValue: string, updatePokemonDto: UpdatePokemonDto) {
		const pokemon = await this.findOne(searchValue);

		if (!pokemon) {
			throw new BadRequestException(`Pokemon not found ${searchValue}`);
		}

		try {
			pokemon.updateOne(updatePokemonDto, { new: true });

			return { ...pokemon.toJSON(), ...updatePokemonDto };
		}
		catch (error) {
			if (error.code === 11000) {
				throw new BadRequestException(`Pokemon already exists in db ${JSON.stringify(error.keyValue)}`);
			}

			throw new InternalServerErrorException('Cannot update pokemon. Check server logs');
		}
	}

	async remove(id: string) {
		//await this.pokemonModel.findByIdAndDelete(id);
		const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

		if (deletedCount === 0) throw new BadRequestException(`Pokemon not found ${id}`);
	}
}
