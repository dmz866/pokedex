import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
	controllers: [PokemonController],
	providers: [PokemonService],
	imports: [
		MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }])
	],
	exports: [
		MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
		PokemonService
	]
})
export class PokemonModule { }
