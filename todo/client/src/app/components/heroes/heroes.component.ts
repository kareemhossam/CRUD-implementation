import { Component, OnInit } from '@angular/core';
import { Hero } from '../../ts/hero';
import { HeroService } from '../../services/hero.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  showHidden:boolean=false;
  selectedHero: Hero;
  id:number=10;
  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
    console.log('onInit');
  }

  getHeroes() {
  this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  addHero(name){
    this.id++;
    name = name.trim();
    if (!name)
     return;
    let hero={
       id:this.id,
       name:name
     };
    this.heroService.addHero(hero)
    .subscribe(hero => {
      this.heroes.unshift(hero as Hero);
    });
  }

  deleteHero(hero:Hero){
    for(let i in this.heroes)
    {
      if(this.heroes[i] == hero)
        this.heroService.deleteHero(hero).subscribe(_ => this.heroes=this.heroes.filter(h => h !== hero));
    }
  }

  hide(hero:Hero){
    hero.hidden=true;
    this.heroService.updateHero(hero).subscribe();
  }

  toggleHidden()
  {
    !this.showHidden;
  }

}
