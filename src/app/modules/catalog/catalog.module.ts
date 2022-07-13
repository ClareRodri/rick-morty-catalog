import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCharacterComponent } from './components/card-character/card-character.component';
import { ListCharacteresComponent } from './components/list-characteres/list-characteres.component';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [CardCharacterComponent,  ListCharacteresComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    NgxPaginationModule
  ],
})
export class CatalogModule { }
