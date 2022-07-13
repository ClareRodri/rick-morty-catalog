import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalDetailCharacterComponent } from './modules/catalog/components/modal-detail-character/modal-detail-character.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from './modules/shared/shared.module';
import { HttpInterceptorRickMorty } from './modules/shared/interceptors/http.interceptor';

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
    SharedModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  entryComponents: [ModalDetailCharacterComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorRickMorty, multi: true },
    BsModalRef
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
