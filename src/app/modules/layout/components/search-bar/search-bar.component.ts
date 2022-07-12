import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CharacterModel } from 'src/app/modules/catalog/models/character.model';
import { CharacteresService } from 'src/app/modules/catalog/services/characteres/characteres.service';
import { FacetTypeEnum } from 'src/app/modules/shared/models/facetTypeEnum';
import { FiltersModel } from 'src/app/modules/shared/models/filtesModel';
import { FilterService } from '../../services/filters/filter.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchText = new FormControl('');
  private componentSubscription: Subscription;
  private filterSubscription: Subscription;
  private filtersSelected = new Subject<FiltersModel>();

  public listResult: CharacterModel[] = [];

  constructor(private readonly filterService: FilterService,
              private readonly characterService: CharacteresService) { }

  ngOnInit(): void {
    this.setSubscription();
  }

  setSubscription(): void {
    this.searchText.valueChanges.pipe(
      debounceTime(400)
    ).subscribe(
      (searchText: string) => {
        if (searchText.length > 0) this.filterService.setFilterSelection(FacetTypeEnum.bar, searchText);
        else this.listResult = []
      }
    )
    
    this.filtersSelected.subscribe(
      (filterApplied: FiltersModel) => {
        if (filterApplied.filterType == FacetTypeEnum.bar) {
          this.characterService.getCharacteresByFilters(filterApplied).subscribe(
            (result: any) => {
              this.listResult = result["results"];
            }
          )
        }
      }
    )

    this.filterSubscription = this.filterService.filterChangeObservable.subscribe(
      (filterChange: FiltersModel) => {
        this.filtersSelected.next(filterChange)
      }
    );
    
  }

  ngOnDestroy(): void {
    this.componentSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }

}
