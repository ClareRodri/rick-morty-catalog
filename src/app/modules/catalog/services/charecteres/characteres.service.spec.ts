import { TestBed } from '@angular/core/testing';

import { CharacteresService } from './characteres.service';

describe('CharacteresService', () => {
  let service: CharacteresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacteresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
