import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCharacteresComponent } from './modules/catalog/components/list-characteres/list-characteres.component';

const routes: Routes = [
  { path: '', component: ListCharacteresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
