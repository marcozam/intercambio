import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { LockService } from '../lock.service';
import { Device } from '../models';

@Component({
  selector: 'app-lock-details',
  templateUrl: './lock-details.component.html',
  styleUrls: ['./lock-details.component.scss']
})
export class LockDetailsComponent {
  
  labels = {
    genarateButton: 'Generar Codigo',
    viewLogsButton: 'Ver registros',
    otp: 'OTP Code',
  }

  statusIconMapping = {
    'offline': 'wifi_off',
    'open': 'lock_open_right'
  }

  @Input()lock: Device;

  constructor(private lockService: LockService) { }

  otpCode$: Observable<string>;

  expirationTimeControl = new FormControl(5);

  expirationTimeFrame = [
    { value: 1, label: '1' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
  ];

  generateOtp() {
    this.lock.status = 'open'
    this.otpCode$ = this.lockService.generateOtp(this.lock.uuid, this.expirationTimeControl.value)
      .pipe(map(r => r.otp))
  }

}
