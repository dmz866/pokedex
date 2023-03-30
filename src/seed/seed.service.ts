import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpAdapter } from 'src/common/interfaces/http-adapter-interface';
import { Pokedex } from 'src/common/interfaces/pokedex.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

	/** 
	constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
		private readonly http: HttpAdapter) { }

	async executeSeed() {
		await this.pokemonModel.deleteMany();

		const { results = [] } = await this.http.get<Pokedex>('https://pokeapi.co/api/v2/pokemon?limit=650')

		// const promisesList = [];

		//results.forEach(async ({ name, url }) => {
			// 		const segments = url.split('/');
			// 	const no = segments[segments.length - 2];
			//promisesList.push(this.pokemonModel.create({ no, name }));
			// });

		// await Promise.all(promisesList);

		const pokemonList = [];

		results.forEach(async ({ name, url }) => {
			const segments = url.split('/');
			const no = segments[segments.length - 2];
			pokemonList.push({ no, name });
		});

		await this.pokemonModel.insertMany(pokemonList);

		return 'seed executed';
	}
**/
}
