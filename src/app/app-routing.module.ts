import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogModule } from './modules/catalog/catalog.module';
import { DetailCharacterComponent } from './modules/catalog/components/detail-character/detail-character.component';
import { ListCharacteresComponent } from './modules/catalog/components/list-characteres/list-characteres.component';
import { LayoutModule } from './modules/layout/layout.module';

const routes: Routes = [
  { path: '', component: ListCharacteresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
