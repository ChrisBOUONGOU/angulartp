import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PokemonsService } from "../pokemons.service";

@Component({
  selector: 'form-pokemon',
  templateUrl: './form-pokemon.component.html',
})
export class FormPokemonComponent implements OnInit {

  @Input() pokemon: any;
  types: any = [];

  constructor(private route: ActivatedRoute, private router: Router, private pokemonsService: PokemonsService) {

  }

  ngOnInit() {
    this.types = this.pokemonsService.getPokemonTypes();
  }

  onSubmit(): void {

    this.pokemonsService.updatePokemon(this.pokemon).subscribe(response => console.log('it work'));
    let link = ['/pokemon', this.pokemon.id];
    this.router.navigate(link);
  }

  //Méthode appelée lorsque l'utilisateur ajoute ou retire un type au pokémon
  selectType($event: any, type: string) {
    let checked = $event.target.checked;
    if (checked) {
      this.pokemon.types.push(type);
    } else {
      let index = this.pokemon.types.indexOf(type);
      if (index > -1) {
        this.pokemon.types.splice(index, 1);
      }
    }
  }
  // Détermine si le type passé en paramètres appartient ou non au pokémon
  hasType(type: string): boolean {
    let index = this.pokemon.types.indexOf(type);
    if (index > -1) return true;
    return false;
  }
  // Valide le nombre de types pour chaque pokémon
  isTypesValid(type: string): boolean {
    if (this.pokemon.types.length === 1 && this.hasType(type)) {
      return false;
    }
    if (this.pokemon.types.length >= 3 && !this.hasType(type)) {
      return false;
    }
    return true;
  }
}
