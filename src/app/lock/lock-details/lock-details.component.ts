import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LockService } from '../lock.service';
import { Device, OTPResponse } from '../models';
import { GenericConfirmationModalComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-lock-details',
  templateUrl: './lock-details.component.html',
  styleUrls: ['./lock-details.component.scss']
})
export class LockDetailsComponent {
  isFlipped = false;
  expirationTimeControl = new FormControl(5); // Default OTP duration in minutes

  labels = {
    genarateButton: 'Generar codigo',
    viewLogsButton: 'Ver registros',
    lockStatus: 'Estado',
    remainingTime: 'Codigo expira en',
    share: {
      message: 'Te comparto el codigo de acceso',
      copy: 'Copiar',
      copySuccess: 'Codigo copiado!', 
      copyClose: 'Cerrar' 
    }
  };

  otpCode$: Observable<OTPResponse>;

  statusIconMapping = {
    'offline': 'wifi_off',
    'open': 'lock_open_right',
    active: 'lock_open',
    inactive: 'lock'
  };

  @Input()lock: Device;

  constructor(private lockService: LockService, private dialog: MatDialog) { }

  expirationTimeFrame = [
    { value: 1, label: '1' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
  ];

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  generateOtp(force: boolean = false) {
    console.log('Generating OTP...');
    this.lock.status = 'open';
    this.otpCode$ = this.lockService.generateOtp(this.lock.uuid, force)
      .pipe(catchError(err => {
        if (err.code === 1000) {
            this.dialog.open(GenericConfirmationModalComponent, {
            data: {
              message: 'Ya existe un código OTP activo. ¿Desea generar uno nuevo?',
              confirmButtonText: 'Sí',
              cancelButtonText: 'No'
            }
            }).afterClosed().subscribe(result => {
            if (result === true) {
              this.generateOtp(true); // Retry with force flag
            }
            });
        } else {
          console.log(err);
        }
        throw err;
      }));
  }

  saveSettings() {
    console.log('Settings saved:', this.expirationTimeControl.value);
    this.flipCard(); // Flip back to the front side
  }

}
