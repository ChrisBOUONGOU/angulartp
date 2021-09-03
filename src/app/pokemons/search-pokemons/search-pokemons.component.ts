import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { PokemonsService } from "../pokemons.service";
import { Pokemon } from "../donnees-pokemons/pokemon";

@Component({
  selector: 'pokemon-search',
  templateUrl: './search-pokemons.component.html'
})
export class PokemonSearchComponent implements OnInit{

  private searchTerms = new Subject<string>();
  pokemons: any;

  constructor(private pokemonService: PokemonsService, private router: Router){

  }

  ngOnInit(){
      this.pokemons = this.searchTerms.pipe(
        // attendre 300ms de pause entre chaque requête
        debounceTime(300),
        // Ignorer la recherche en cours si c'est la même que la précédente
        distinctUntilChanged(),
        // On retourne la liste des résultats correspondant aux termes de la recherche
        switchMap((term: string) => this.pokemonService.searchPokemons(term)),
      );
  }

  search(term: string): void{
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon): void{
    let link = ['/pokemon',pokemon.id];
    this.router.navigate(link);
  }

}