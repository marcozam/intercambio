import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { LocksComponent } from './locks/locks.component';
import { LockDetailsComponent } from './lock-details/lock-details.component';
import { LockService } from './lock.service';
import { CountdownComponent } from './components';

@NgModule({
  declarations: [
    LocksComponent,
    LockDetailsComponent,
    CountdownComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatButtonToggleModule
  ],
  providers: [
    LockService
  ]
})
export class LockModule { }
