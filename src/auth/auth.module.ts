import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { LoginComponent, ForgotUsernameComponent, ForgotPasswordComponent, RegisterComponent } from './components';
import { LoginService } from './services';
// import { OAuthInterceptor } from './oauth.interceptor';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotUsernameComponent,
    ForgotPasswordComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent },
      { path: 'forgot-username', component: ForgotUsernameComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'register', component: RegisterComponent }
    ]),
  ],
  providers: [
    LoginService,
    // { provide: HTTP_INTERCEPTORS, useClass: OAuthInterceptor, multi: true }
  ]
})
export class AuthModule { }