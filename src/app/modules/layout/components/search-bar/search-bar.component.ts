import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CharacterModel } from 'src/app/modules/catalog/models/character.model';
import { FacetTypeEnum } from 'src/app/modules/shared/models/facetTypeEnum';
import { FilterService } from '../../services/filters/filter.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public searchText = new FormControl('');
  private componentSubscription: Subscription;

  public listResult: CharacterModel[] = [];
  private bsModalRef?: BsModalRef;

  constructor(private readonly filterService: FilterService) { }

  ngOnInit(): void {
    this.setSubscription();
  }

  private setSubscription(): void {
    this.searchText.valueChanges.pipe(
      debounceTime(400)
    ).subscribe(
      (searchText: string) => {
        if (searchText.length > 0) this.filterService.setFilterSelection(FacetTypeEnum.bar, searchText);
        else this.listResult = []
      }
    )
  }

  public getSearch() {
    this.filterService.setFilterSelection(FacetTypeEnum.name, this.searchText.value);
    this.listResult = []
  }

  public clearSearch() {
    this.searchText.setValue('')
    this.getSearch();
  }

  ngOnDestroy(): void {
    this.componentSubscription.unsubscribe();
  }

}
