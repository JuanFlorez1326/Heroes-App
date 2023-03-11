import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-heroes',
  templateUrl: './add-heroes.component.html'
})
export class AddHeroesComponent implements OnInit {

  constructor(
    private readonly heroesService: HeroesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.heroesService.getHeroById(id))
    )
    .subscribe( data => this.heroe = data );
  }


  publishers = [ 
    { id: 'DC Comics', name: 'DC - Comics' },
    { id: 'Marvel Comics', name: 'Marvel - Comics' }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  saveHero() {
    if(this.heroe.superhero.trim().length === 0) { return; }

    if(this.heroe.id) {
      this.heroesService.updateHero(this.heroe)
      .subscribe(heroe => console.log(heroe));
    } else {
      this.heroesService.addHero(this.heroe)
      .subscribe(heroe => {
        console.log(heroe);
        this.router.navigate(['/heroes/edit-hero', heroe.id]);
      });
    }
  }
}