import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { FilterService } from 'src/app/modules/layout/services/filters/filter.service';
import { FiltersModel } from 'src/app/modules/shared/models/filtesModel';
import { CharacterModel } from '../../models/character.model';
import { CharacteresService } from '../../services/characteres/characteres.service';
import { FacetTypeEnum } from 'src/app/modules/shared/models/facetTypeEnum';
@Component({
  selector: 'app-list-characteres',
  templateUrl: './list-characteres.component.html',
  styleUrls: ['./list-characteres.component.scss']
})
export class ListCharacteresComponent implements OnInit, OnDestroy {

  public characterSub: any[] = [];
  public listCharacteres: CharacterModel[] = [];
  private countPag = 1;

  public filterSubscription: Subscription;
  public filtersSelected = new Subject<FiltersModel>();
  public pagination = new Subject<number>();

  constructor(
    private readonly characterService: CharacteresService,
    private readonly filterService: FilterService
  ) { this.createSubscriptions(); }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.characterSub.map(item => item.unsubscribe());
  }

  private createSubscriptions() {
    this.filtersSelected.subscribe(
      (filterApplied: FiltersModel) => {
        if (filterApplied.filterType != FacetTypeEnum.bar) {
          this.characterService.getCharacteresByFilters(filterApplied).subscribe(
            (result: any) => {
              if (filterApplied.type == 'scroll') this.listCharacteres = this.listCharacteres.concat(result.results);
              else this.listCharacteres = result.results;
            }
          )
        }
      }
    )    
    this.filterSubscription = this.filterService.filterChangeObservable.subscribe(
      (filterChange: FiltersModel) => {
        this.countPag = filterChange.page;
        this.filtersSelected.next(filterChange)
      }
    )    
  }

  public onScroll(ev) {
    this.countPag++;
    this.filterService.setFilterSelection(FacetTypeEnum.page, this.countPag);
  }
}
