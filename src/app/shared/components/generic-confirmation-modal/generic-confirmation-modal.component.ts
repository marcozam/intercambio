import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-confirmation-modal',
  templateUrl: './generic-confirmation-modal.component.html',
  styleUrls: ['./generic-confirmation-modal.component.scss']
})
export class GenericConfirmationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<GenericConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; confirmButtonText: string; cancelButtonText: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
