import { Injectable } from '@angular/core';
import { FacetsModel } from 'src/app/modules/shared/models/facetsModel';
import * as facets from '../../../../../assets/json/facetsOptions.json'

@Injectable({
  providedIn: 'root'
})
export class FacetsService {

  constructor() { }

  getFacets(): FacetsModel {
    return (facets as any).default as FacetsModel;
  }
}
