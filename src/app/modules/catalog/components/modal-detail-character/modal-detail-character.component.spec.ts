import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailCharacterComponent } from './modal-detail-character.component';

describe('ModalDetailCharacterComponent', () => {
  let component: ModalDetailCharacterComponent;
  let fixture: ComponentFixture<ModalDetailCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetailCharacterComponent ]
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
