import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GenericConfirmationModalComponent } from './components/generic-confirmation-modal/generic-confirmation-modal.component';

@NgModule({
  declarations: [GenericConfirmationModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [GenericConfirmationModalComponent]
})
export class SharedModule {}
