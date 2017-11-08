import { TestBed, inject } from '@angular/core/testing';

import { EditContextService } from './edit-context.service';

describe('EditContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditContextService]
    });
  });

  it('should be created', inject([EditContextService], (service: EditContextService) => {
    expect(service).toBeTruthy();
  }));
});
