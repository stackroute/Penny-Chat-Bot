import { TestBed, inject } from '@angular/core/testing';

import { AddNewContextService } from './add-new-context.service';

describe('AddNewContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddNewContextService]
    });
  });

  it('should be created', inject([AddNewContextService], (service: AddNewContextService) => {
    expect(service).toBeTruthy();
  }));
});
