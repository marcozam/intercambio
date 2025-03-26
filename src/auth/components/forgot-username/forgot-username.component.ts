import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-username',
  templateUrl: './forgot-username.component.html',
  // styleUrls: ['./forgot-username.component.css']
})
export class ForgotUsernameComponent {
  forgotUsernameForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.forgotUsernameForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.forgotUsernameForm.valid) {
      console.log('Request to recover username sent:', this.forgotUsernameForm.value);
      // Add logic to handle the request
    }
  }
}