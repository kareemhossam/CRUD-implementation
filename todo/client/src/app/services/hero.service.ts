import { Injectable } from '@angular/core';
import { Hero } from '../ts/hero';
// import { HEROES } from '../ts/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, take, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl='http://localhost:3000/api/tasks';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.messageService.add('Task: fetched tasks')),
      catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id: Number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.messageService.add(`Fetched task id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}

  updateHero(hero:Hero){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
    tap(heroes => this.messageService.add('Task: updated task id: '+hero.id)),
    catchError(this.handleError<Hero>('updateHero id: '+hero.id))
  );
}

  addHero(hero:Hero){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(heroes => this.messageService.add('Task: added task: '+hero.name)),
      catchError(this.handleError<Hero>('addHero id: '+hero.id))
    );
  }

  deleteHero(hero:Hero){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.delete<Hero>(url,httpOptions).pipe(
      tap(_ => this.messageService.add('Task: deleted task: '+hero.name)),
      catchError(this.handleError<Hero>('deleteHero id: '+hero.id))
    );
  }

  searchHeroes(name): Observable<Hero[]> {
  if (!name.trim()) {
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?filter[where][name][regexp]=.*${name}.`).pipe(
    tap(_ => this.messageService.add(`found tasks matching "${name}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}

  private handleError<T>(method='method',result?:T){
    return (error: any): Observable<T> => {
      console.error(error);
       this.messageService.add(`${method} failed: ${error.message}`);
       return of(result as T);
    };
  }

}
