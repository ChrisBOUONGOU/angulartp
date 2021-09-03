import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../pokemons.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
})
export class EditPokemonComponent implements OnInit{

  pokemon: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private pokemonsService: PokemonsService){
  }

  ngOnInit(): void{
    let id = this.route.snapshot.params.id;
    this.pokemonsService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
  
  }
}