import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
	constructor(private readonly pokemonService: PokemonService) { }

	@Post()
	@HttpCode(HttpStatus.OK)
	create(@Body() createPokemonDto: CreatePokemonDto) {
		return this.pokemonService.create(createPokemonDto);
	}

	@Get()
	findAll() {
		return this.pokemonService.findAll();
	}

	@Get(':searchValue')
	findOne(@Param('searchValue') searchValue: string) {
		return this.pokemonService.findOne(searchValue);
	}

	@Patch(':searchValue')
	update(@Param('searchValue') searchValue: string, @Body() updatePokemonDto: UpdatePokemonDto) {
		return this.pokemonService.update(searchValue, updatePokemonDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.pokemonService.remove(id);
	}
}
