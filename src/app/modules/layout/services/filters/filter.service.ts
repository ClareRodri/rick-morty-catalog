import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FacetTypeEnum } from 'src/app/modules/shared/models/facetTypeEnum';
import { FiltersModel } from 'src/app/modules/shared/models/filtesModel';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterSubject = new BehaviorSubject<FiltersModel>(null);
  private currentFilterValue: FiltersModel;
  private facetType = FacetTypeEnum;

  filterChangeObservable = this.filterSubject.asObservable();

  constructor() {
    this.setInitialState();
  }

  setInitialState () {
    this.currentFilterValue = {
      gender: '',
      searchBar: '',
      specie: '',
      status: ''
    };
    this.filterSubject.next(this.currentFilterValue);
  }

  setFilterSelection(filterType: string, value: string) {
    switch (filterType) {
      case this.facetType.status:
        this.currentFilterValue = {
          ...this.currentFilterValue,
          status: this.currentFilterValue.status.includes(value) ? this.currentFilterValue.status.replace(value, ""): value
        };
        break;
      case this.facetType.gender:
        this.currentFilterValue = {
          ...this.currentFilterValue,
          gender: this.currentFilterValue.gender.includes(value) ? this.currentFilterValue.gender.replace(value, ""): value
        };
        break;
      case this.facetType.specie:
        this.currentFilterValue = {
          ...this.currentFilterValue,
          specie: this.currentFilterValue.specie.includes(value) ? this.currentFilterValue.specie.replace(value, ""): value
        };
        break;
      default:
        break;
    }

    this.filterSubject.next(this.currentFilterValue);
  }
}
