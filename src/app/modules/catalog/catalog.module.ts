import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCharacterComponent } from './components/card-character/card-character.component';
import { ListCharacteresComponent } from './components/list-characteres/list-characteres.component';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
  declarations: [CardCharacterComponent,  ListCharacteresComponent],
  imports: [
    CommonModule,
    RouterModule,
    InfiniteScrollModule
  ],
})
export class CatalogModule { }
