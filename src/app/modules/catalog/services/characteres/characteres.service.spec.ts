import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';

import { CharacteresService } from './characteres.service';

describe('CharacteresService', () => {
  let service: CharacteresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        BsModalService
      ]
    });
    service = TestBed.inject(CharacteresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
