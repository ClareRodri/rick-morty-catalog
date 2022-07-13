import { Component, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { FilterService } from 'src/app/modules/layout/services/filters/filter.service';
import { FiltersModel } from 'src/app/modules/shared/models/filtesModel';
import { CharacterModel } from '../../models/character.model';
import { CharacteresService } from '../../services/characteres/characteres.service';
import { FacetTypeEnum } from 'src/app/modules/shared/models/facetTypeEnum';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalDetailCharacterComponent } from '../modal-detail-character/modal-detail-character.component';
import { PaginationModel } from '../../models/pagination.model';
@Component({
  selector: 'app-list-characteres',
  templateUrl: './list-characteres.component.html',
  styleUrls: ['./list-characteres.component.scss']
})
export class ListCharacteresComponent implements OnInit, OnDestroy {

  public characterSub: any[] = [];
  public listCharacteres: CharacterModel[] = [];

  private countPag = 0;
  public paginationType = "";


  public filterSubscription: Subscription;
  public filtersSelected = new Subject<FiltersModel>();
  public pagination = new Subject<number>();
  public paginationModel: PaginationModel;
  public bsModalRef?: BsModalRef;

  constructor(
    private readonly characterService: CharacteresService,
    private readonly filterService: FilterService,
    private modalService: BsModalService
  ) {
    this.createSubscriptions();
    this.config()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.characterSub.map(item => item.unsubscribe());
  }

  public openNewDialog(item) {
    const initialState: any = {
      initialState: {
        detailModel: item
      }
    };
    this.bsModalRef = this.modalService.show(ModalDetailCharacterComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public setTypeVisual(type) {
    this.paginationType = type;
    this.countPag = 0;
    this.listCharacteres = [];

    if (type == 'scroll') this.onScroll();
    else this.pageChanged(1);

  }

  private createSubscriptions() {
    this.filtersSelected.subscribe(
      (filterApplied: FiltersModel) => {
        if (filterApplied.filterType != FacetTypeEnum.bar) {
          this.characterService.getCharacteresByFilters(filterApplied).subscribe(
            (result: any) => {
              this.paginationModel.totalItems = result.info.count;

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

  private config() {
    this.countPag = 1;
    this.paginationType = "scroll";
    this.paginationModel = new PaginationModel();
    this.paginationModel.itemsPerPage = 20;
  }

  private pageChanged(ev) {
    this.paginationModel.currentPage = ev;
    this.filterService.setFilterSelection(FacetTypeEnum.page, ev);
  }

  private onScroll() {
    this.countPag++;
    this.filterService.setFilterSelection(FacetTypeEnum.scroll, this.countPag);
  }

}
