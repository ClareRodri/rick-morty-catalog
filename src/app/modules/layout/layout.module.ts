import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, SearchBarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [HeaderComponent, SidebarComponent]
})
export class LayoutModule { }
