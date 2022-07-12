import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { HttpClientModule } from '@angular/common/http';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalDetailCharacterComponent } from './modules/catalog/components/modal-detail-character/modal-detail-character.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalDetailCharacterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    CatalogModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule
  ],
  entryComponents: [ModalDetailCharacterComponent],
  providers: [BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
