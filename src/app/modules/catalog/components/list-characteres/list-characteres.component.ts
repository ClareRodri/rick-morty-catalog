import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { FilterService } from 'src/app/modules/layout/services/filters/filter.service';
import { FiltersModel } from 'src/app/modules/shared/models/filtesModel';
import { CharacterModel } from '../../models/character.model';
import { CharacteresService } from '../../services/characteres/characteres.service';

@Component({
  selector: 'app-list-characteres',
  templateUrl: './list-characteres.component.html',
  styleUrls: ['./list-characteres.component.scss']
})
export class ListCharacteresComponent implements OnInit, OnDestroy {

  public characterSub: any[] = [];
  filterSubscription: Subscription;

  public listCharacteres: CharacterModel[];

  filtersSelected = new Subject<FiltersModel>();

  constructor(
    private readonly characterService: CharacteresService,
    private readonly filterService: FilterService
  ) {
    this.createSubscriptions();
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.characterSub.map(item => item.unsubscribe());
  }

  private createSubscriptions() {
    // this.characterSub.push(this.characterService.getAllCharacteres().subscribe(items => this.getAllCharacteres(items)));
    this.filterSubscription = this.filterService.filterChangeObservable.subscribe(
      (filterChange: FiltersModel) => {
        this.filtersSelected.next(filterChange)
      }
    )

    this.characterSub.push(
      this.filtersSelected.subscribe(
        (filterApplied: FiltersModel) => {
          //TODO: Reset pagination
          this.characterService.getCharacteresByFilters(filterApplied).subscribe(
            (result) => {
              console.log(result);
            }
          )
        }
      )
    );
  }

  private getAllCharacteres(items: CharacterModel[]) {
    console.log("getAllCharacteres", items);
    this.listCharacteres = items;
  }

  private getCharacterById(items) {
    console.log("getCharacterById", items);
  }

  private getCharacteresById(items) {
    console.log("getCharacteresById", items);
  }

  private getCharacteresByFilters(items) {
    console.log("getCharacteresById", items);
  }
}
