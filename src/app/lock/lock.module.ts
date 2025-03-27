import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LocksComponent } from './locks/locks.component';
import { LockDetailsComponent } from './lock-details/lock-details.component';
import { LockService } from './lock.service';
import { CountdownComponent, ShareCodeComponent, OtpDisplayComponent } from './components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LocksComponent,
    LockDetailsComponent,
    CountdownComponent,
    OtpDisplayComponent,
    ShareCodeComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    SharedModule,
  ],
  providers: [
    LockService
  ]
})
export class LockModule { }
