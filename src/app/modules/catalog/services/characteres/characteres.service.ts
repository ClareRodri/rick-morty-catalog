import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterModel } from '../../models/character.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacteresService {

  private URLBASE = environment.urlApi;
  private URLAPI = {
    Character: '/character'
  };
    
  constructor(private httpCliente: HttpClient) { }

  public getAllCharacteres(): Observable<CharacterModel[]> {
    return this.httpCliente
      .get(`${this.URLBASE}/${this.URLAPI.Character}`)
      .pipe(
        map((resp: any) => resp["results"].map(item => new CharacterModel(item)))
      )
  }

  public getCharacterById(id: number): Observable<CharacterModel>  {
    return this.httpCliente
      .get(`${this.URLBASE}/${this.URLAPI.Character}/${id}`)
      .pipe(
        map((resp: any) => new CharacterModel(resp))
      )
  }

  public getCharacteresById(ids: number[]): Observable<CharacterModel[]> {
    var listIds = ids.toString();
    return this.httpCliente
      .get(`${this.URLBASE}/${this.URLAPI.Character}/${listIds}`)
      .pipe(
        map((resp: any[]) => resp.map(item => new CharacterModel(item)))
      )
  }
  
  public getCharacteresByFilters() { }

}
