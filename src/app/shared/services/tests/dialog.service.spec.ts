import { TestBed } from '@angular/core/testing';
import { DialogService } from '../dialog.service';

// TODO
describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
