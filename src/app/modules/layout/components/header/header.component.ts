import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FacetTypeEnum } from 'src/app/modules/shared/models/facetTypeEnum';
import { FilterService } from '../../services/filters/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  searchText = new FormControl('');

  componentSubscription : Subscription;

  constructor(
    private readonly FilterService: FilterService
  ) { }

  ngOnInit(): void {
    this.setSubscription();
  }

  setSubscription(): void {
    this.searchText.valueChanges.pipe(
      debounceTime(600)
    ).subscribe(
      (searchText: string) => {
        this.FilterService.setFilterSelection(FacetTypeEnum.name, searchText);
      }
    )
  }

  ngOnDestroy(): void {
      this.componentSubscription.unsubscribe();
  }

}
