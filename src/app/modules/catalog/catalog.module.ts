import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCharacterComponent } from './components/card-character/card-character.component';
import { DetailCharacterComponent } from './components/detail-character/detail-character.component';
import { ListCharacteresComponent } from './components/list-characteres/list-characteres.component';



@NgModule({
  declarations: [CardCharacterComponent, DetailCharacterComponent, ListCharacteresComponent],
  imports: [
    CommonModule
  ]
})
export class CatalogModule { }
