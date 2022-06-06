import { TestBed } from '@angular/core/testing';

import { MapParkingService } from './map-parking.service';

describe('MapParkingService', () => {
  let service: MapParkingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapParkingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
