import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError } from 'rxjs';
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
      map(res => res.devices),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching device list:', error);
        throw error;
      })
    )
  }

  generateOtp(deviceUuid: string, force = false): Observable<OTPResponse> {
    const path = `${this.path}/${deviceUuid}/otp`;
    return this.httpClient.post<OTPResponse>(path, { force }).pipe(
      map(r => ({ otp: r.otp, expiration: new Date(r.expiration) })),
      catchError((httpError: HttpErrorResponse) => {
        console.error('Error generating OTP:', httpError);
        throw httpError.error;
      })
    );
  }

}
