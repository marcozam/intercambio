import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';

import { DeviceService } from './device.service';
import { UtilitiesService } from './utilities';

fdescribe('DeviceService', () => {
  let service: DeviceService;
  const gUuid = '123456789';
  const storageKey = 'deviceKey';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:  [
        MockService(UtilitiesService, { shortUuid: () => gUuid })
      ]
    });
    service = TestBed.inject(DeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set device key', () => {
    const uuid = service.getDeviceKey();
    expect(uuid).toEqual(gUuid);
  });
});
