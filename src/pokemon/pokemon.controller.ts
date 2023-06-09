import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
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
	findAll(@Query() paginationDto: PaginationDTO) {
		return this.pokemonService.findAll(paginationDto);
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
	remove(@Param('id', ParseMongoIdPipe) id: string) {
		return this.pokemonService.remove(id);
	}
}
