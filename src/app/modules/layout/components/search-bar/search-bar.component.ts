import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ModalDetailCharacterComponent } from 'src/app/modules/catalog/components/modal-detail-character/modal-detail-character.component';
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
  bsModalRef?: BsModalRef;

  constructor(private readonly filterService: FilterService,
              private readonly characterService: CharacteresService,
              private modalService: BsModalService) { }

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
  }

  public getSearch() {
    this.filterService.setFilterSelection(FacetTypeEnum.name, this.searchText.value);
    this.listResult = []
  }

  public clearSearch() {
    this.searchText.setValue('')
  }

  ngOnDestroy(): void {
    this.componentSubscription.unsubscribe();
  }

}
