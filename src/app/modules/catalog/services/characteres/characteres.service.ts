import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterModel } from '../../models/character.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FiltersModel } from 'src/app/modules/shared/models/filtesModel';
import { FacetTypeEnum } from 'src/app/modules/shared/models/facetTypeEnum';

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

  public getCharacteresByFilters(filterApplied: FiltersModel) {
    let paramQuery = "";

    paramQuery = this.setQueryParam(paramQuery, FacetTypeEnum.gender, filterApplied.gender);
    paramQuery = this.setQueryParam(paramQuery, FacetTypeEnum.specie, filterApplied.specie);
    paramQuery = this.setQueryParam(paramQuery, FacetTypeEnum.status, filterApplied.status);
    paramQuery = this.setQueryParam(paramQuery, FacetTypeEnum.name, filterApplied.searchBar);

    const queryUrl = `${this.URLBASE}${this.URLAPI.Character}${paramQuery}`;
    return this.httpCliente.get(queryUrl);
  }

  private setQueryParam(query: string, key: string, value: string) {
    const appendQuery = value.length > 0 ? `${key}=${value}`: ''

    if(appendQuery.length === 0) {
      return query;
    }

    return query.length === 0 ? `?${appendQuery}`: `${query}&${appendQuery}`;
  }

}
