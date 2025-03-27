import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-share-code',
  templateUrl: './share-code.component.html',
  styleUrls: ['./share-code.component.scss']
})
export class ShareCodeComponent {
  @Input() code: string;
  @Input() labels: {
    copy: string;
    copySuccess: string;
    copyClose: string;
    message: string;
  } = { 
    message: 'Your OTP code is',
    copy: 'Copy', 
    copySuccess: 'Code copied to clipboard!', 
    copyClose: 'Close' 
  }

  
  constructor(private snackBar: MatSnackBar) {}
  
  shareViaWhatsApp(): void {
    const message = `${this.labels.message}: ${this.code}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  shareViaSms(): void {
    const message = `${this.labels.message}: ${this.code}`;
    const url = `sms:?body=${encodeURIComponent(message)}`;
    window.open(url, '_self');
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.code).then(() => {
      this.snackBar.open(this.labels.copySuccess, this.labels.copyClose, {
        duration: 3000,
      });
    });
  }
}
