import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-otp-display',
  templateUrl: './otp-display.component.html',
  styleUrls: ['./otp-display.component.scss']
})
export class OtpDisplayComponent {
  @Input() otpCode!: string;
}
