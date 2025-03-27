import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // Added SCSS file
})
export class RegisterComponent {
  registerForm: FormGroup;
  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        useEmailAsUsername: [false],
        username: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );

    this.subscriptions.add(
      this.registerForm.get('useEmailAsUsername')?.valueChanges.subscribe((useEmailAsUsername) => {
        if (useEmailAsUsername) {
          const email = this.registerForm.get('email')?.value;
          this.registerForm.get('username')?.setValue(email);
          this.registerForm.get('username')?.disable();
        } else {
          this.registerForm.get('username')?.enable();
        }
      })
    );

    this.subscriptions.add(
      this.registerForm.get('email')?.valueChanges.subscribe((email) => {
        if (this.registerForm.get('useEmailAsUsername')?.value) {
          this.registerForm.get('username')?.setValue(email);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
    }
  }
}
