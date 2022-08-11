import { TestBed } from '@angular/core/testing';

import { StorageInputService } from './storage-input.service';

describe('StorageInputService', () => {
  let service: StorageInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
