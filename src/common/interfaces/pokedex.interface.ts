import { PokedexResult } from "./pokedex-result.interface";

export interface Pokedex {
	count: number;
	next: string;
	previous: null;
	results: PokedexResult[];
}