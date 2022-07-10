import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogModule } from './modules/catalog/catalog.module';
import { LayoutModule } from './modules/layout/layout.module';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
            LayoutModule,
            CatalogModule]
})
export class AppRoutingModule { }
