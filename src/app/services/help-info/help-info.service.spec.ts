import { TestBed } from '@angular/core/testing';

import { HelpInfoService } from './help-info.service';

describe('HelpInfoService', () => {
  let service: HelpInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
