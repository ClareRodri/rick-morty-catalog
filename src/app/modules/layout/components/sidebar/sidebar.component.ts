import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FacetsModel } from 'src/app/modules/shared/models/facetsModel';
import { FacetTypeEnum } from 'src/app/modules/shared/models/facetTypeEnum';
import { FiltersModel } from 'src/app/modules/shared/models/filtesModel';
import { FacetsService } from '../../services/facets/facets.service';
import { FilterService } from '../../services/filters/filter.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  facetList: FacetsModel;

  facetType = FacetTypeEnum;

  filterSubscription = new Subscription();

  currentFilterSelection = new FiltersModel();

  constructor(
    private readonly facetsService: FacetsService,
    private readonly filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.getFacets();
    this.setFilterSubscription();
  }

  getFacets(): void {
    this.facetList = this.facetsService.getFacets();
  }

  setFilterSubscription(): void {
    this.filterSubscription.add(
      this.filterService.filterChangeObservable.subscribe(
        (filterChanges: FiltersModel) => {
          this.currentFilterSelection = filterChanges;
        }
      )
    );
  }

  setFacet(facetType: string, value: string): void {
    this.filterService.setFilterSelection(facetType, value);
  }

  ngOnDestroy(): void {
      this.filterSubscription.unsubscribe();
  }
}
