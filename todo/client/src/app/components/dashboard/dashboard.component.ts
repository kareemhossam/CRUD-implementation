import { Component, OnInit } from '@angular/core';
import { Hero } from '../../ts/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  topHeroes: Hero[];
  selectedHero:Hero;
  constructor(private heroService:HeroService) { }

  ngOnInit() {
    this.getTopHeroes();
  }
  getTopHeroes(){
    this.heroService.getHeroes()
      .subscribe(topHeroes => this.topHeroes = topHeroes.slice(0,4));
  }
}
