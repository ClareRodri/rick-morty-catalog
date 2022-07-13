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
      status: '',
      page: 1,
      type: '',
      filterType: ''
    };
    
    this.filterSubject.next(this.currentFilterValue);
  }

  setFilterSelection(filterType: string, value: any) {
    switch (filterType) {
      case this.facetType.status:
        this.currentFilterValue = {
          ...this.currentFilterValue,
          filterType: filterType,
          page: 1,
          type: "",
          status: this.currentFilterValue.status.includes(value) ? this.currentFilterValue.status.replace(value, ""): value
        };
        break;
      case this.facetType.gender:
        this.currentFilterValue = {
          ...this.currentFilterValue,
          filterType: filterType,
          page: 1,
          type: "",
          gender: this.currentFilterValue.gender.includes(value) ? this.currentFilterValue.gender.replace(value, ""): value
        };
        break;
      case this.facetType.specie:
        this.currentFilterValue = {
          ...this.currentFilterValue,
          filterType: filterType,
          page: 1,
          type: "",
          specie: this.currentFilterValue.specie.includes(value) ? this.currentFilterValue.specie.replace(value, ""): value
        };
        break;
      case this.facetType.name:
          this.currentFilterValue = {
            ...this.currentFilterValue,
            filterType: filterType,
            page: 1,
            type: "",
            searchBar: value
          };
        break;
      case this.facetType.bar:
        this.currentFilterValue = {
          ...this.currentFilterValue,
          filterType: filterType,
          page: 1,
          type: "",
          searchBar: value
        };
        break;
      case this.facetType.page:
        this.currentFilterValue = {
          ...this.currentFilterValue,
          filterType: filterType,
          page: parseInt(value),
          type: "page"
        };
        break; 
      case this.facetType.scroll:
        this.currentFilterValue = {
          ...this.currentFilterValue,
          filterType: filterType,
          page: parseInt(value),
          type: "scroll"
        };
        break; 
      default:
        break;
    }

    this.filterSubject.next(this.currentFilterValue);
  }
}
