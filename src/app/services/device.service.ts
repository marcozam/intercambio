import { Injectable } from '@angular/core';
import { UtilitiesService } from './utilities';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private readonly DEVICE_KEY = 'deviceKey';

  private deviceUuid: string;

  constructor(private utilities: UtilitiesService) { }

  getDeviceKey(): string {
    let uuid = this.deviceUuid || this.getStoredDeviceKey();
    if(!uuid) {
      uuid = this.setDeviceKey();
    }
    return uuid;
  }

  private setDeviceKey(): string {
    const uuid = this.utilities.shortUuid();
    localStorage.setItem(this.DEVICE_KEY, uuid);
    this.deviceUuid = uuid;
    return uuid;
  }

  private getStoredDeviceKey(): string {
    return localStorage.getItem(this.DEVICE_KEY);
  }
}
