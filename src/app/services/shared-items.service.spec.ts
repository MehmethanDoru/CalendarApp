import { TestBed } from '@angular/core/testing';

import { SharedItemsService } from './shared-items.service';

describe('SharedItemsService', () => {
  let service: SharedItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
