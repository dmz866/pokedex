import { IsInt, IsPositive, IsString, MinLength } from "class-validator";

export class CreatePokemonDto {
	@IsString()
	@MinLength(1)
	name: string;

	@IsPositive()
	@IsInt()
	no: number;
}
