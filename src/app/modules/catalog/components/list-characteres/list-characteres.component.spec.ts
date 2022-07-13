import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCharacteresComponent } from './list-characteres.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPaginationModule } from 'ngx-pagination';import { CharacteresService } from '../../services/characteres/characteres.service';
import { CharacteresMockService } from '../../services/characteres/characteres-mock.service';
import { of, throwError } from 'rxjs';
import { CharacterModel } from '../../models/character.model';


describe('ListCharacteresComponent', () => {
  let component: ListCharacteresComponent;
  let fixture: ComponentFixture<ListCharacteresComponent>;
  let characteresService: CharacteresService;
  let characteresMock = new CharacteresMockService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCharacteresComponent],
      imports: [
        ModalModule.forRoot(),
        HttpClientTestingModule,
        CommonModule,
        InfiniteScrollModule,
        NgxPaginationModule],
      providers: [
        BsModalService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCharacteresComponent);
    characteresService = TestBed.inject(CharacteresService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show "No result found"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const componentError = fixture.componentInstance;
    componentError.listCharacteres = [];
    expect(compiled.querySelector('.list-characteres-type-view h2')?.textContent).toContain('No results found');
  });

  it('should concat results for filter type scroll', () => {
    const componentResult = fixture.componentInstance;
    const listCharacteres = characteresMock.getCharacteres();
    spyOn(characteresService, 'getCharacteresByFilters').and.returnValue(of({ results: listCharacteres }));
    componentResult.listCharacteres = listCharacteres.map(p=> new CharacterModel(p));
    componentResult.setTypeVisual('scroll');
    expect(componentResult.listCharacteres.length).toBeGreaterThanOrEqual(2)
  });

  it('should replace results for filter type page', () => {
    const componentResult = fixture.componentInstance;
    const listCharacteres = characteresMock.getCharacteres();
    spyOn(characteresService, 'getCharacteresByFilters').and.returnValue(of({ results: [new CharacterModel(listCharacteres[0])] }));
    componentResult.listCharacteres = listCharacteres.map(p => new CharacterModel(p));
    componentResult.setTypeVisual('page');
    expect(componentResult.listCharacteres.length).toBeLessThan(listCharacteres.length)
  });

  it('should show results for different filter type to page and clear pagination model', () => {
    const componentResult = fixture.componentInstance;
    const listCharacteres = characteresMock.getCharacteres();
    spyOn(characteresService, 'getCharacteresByFilters').and.returnValue(of({ info: {count: 45}, results: [new CharacterModel(listCharacteres[0])] }));
    componentResult.listCharacteres = listCharacteres.map(p => new CharacterModel(p));
    componentResult.setTypeVisual('something');
    expect(componentResult.listCharacteres.length).toBeLessThan(listCharacteres.length)
  });

  it('should try to get characteres but throwError', () => {
    const componentResult = fixture.componentInstance;
    const listCharacteres = characteresMock.getCharacteres();
    spyOn(characteresService, 'getCharacteresByFilters').and.returnValue(throwError(() => new Error('Test failure')));
    componentResult.listCharacteres = listCharacteres.map(p => new CharacterModel(p));
    componentResult.setTypeVisual('something');
    expect(componentResult.listCharacteres.length).toEqual(0)
  });

});
