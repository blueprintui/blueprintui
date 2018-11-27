import { TestBed } from '@angular/core/testing';

import { RouterMetaDataService } from './router-meta-data.service';

describe('RouterMetaDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouterMetaDataService = TestBed.get(RouterMetaDataService);
    expect(service).toBeTruthy();
  });
});
