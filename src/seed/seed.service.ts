import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokedex } from 'src/common/interfaces/pokedex.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {
	private readonly axios: AxiosInstance = axios;

	constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>) { }

	async executeSeed() {
		await this.pokemonModel.deleteMany();

		const { data: { results = [] } } = await this.axios.get<Pokedex>('https://pokeapi.co/api/v2/pokemon?limit=650')
		const promisesList = [];

		results.forEach(async ({ name, url }) => {
			const segments = url.split('/');
			const no = segments[segments.length - 2];
			promisesList.push(this.pokemonModel.create({ no, name }));
		});

		await Promise.all(promisesList);

		return 'seed executed';
	}
}
