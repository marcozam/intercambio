import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Device, DeviceListResponse, OTPResponse } from './models';

@Injectable({
  providedIn: 'root'
})
export class LockService {

  readonly path = `${environment.apiUrl}/api/user/lock`;

  httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  getList(): Observable<Device[]> {
    return this.httpClient.get<DeviceListResponse>(this.path).pipe(
      map(res => res.devices)
    )
  }

  generateOtp(deviceUuid: string, expiration: number = 5): Observable<OTPResponse> {
    const path = `${this.path}/${deviceUuid}/otp`;
    return this.httpClient.post<OTPResponse>(path, { expiration });
  }

}
