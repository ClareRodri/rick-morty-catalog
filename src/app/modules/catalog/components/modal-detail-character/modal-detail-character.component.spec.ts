import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPaginationModule } from 'ngx-pagination';

import { ModalDetailCharacterComponent } from './modal-detail-character.component';

describe('ModalDetailCharacterComponent', () => {
  let component: ModalDetailCharacterComponent;
  let fixture: ComponentFixture<ModalDetailCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDetailCharacterComponent],
      imports: [
        ModalModule.forRoot(),
        HttpClientTestingModule,
        CommonModule,
        InfiniteScrollModule,
        NgxPaginationModule],
      providers: [
        BsModalRef
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
