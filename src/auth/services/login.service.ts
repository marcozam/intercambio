import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface LoginResponse {
  token: string;
  user?: any;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly loginUrl = `${environment.apiUrl}/api/auth/login`;
  private readonly tokenName = 'accessToken';

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    const basicAuth = btoa(`${username}:${password}`);
    return this.httpClient.post<LoginResponse>(this.loginUrl, "", {
      headers: {
        'Authorization': `Basic ${basicAuth}`
      }
    }).pipe(
      tap(({ token }) => {
        localStorage.setItem(this.tokenName, token);
      })
    );
  }

  getToken() {
    return localStorage.getItem(this.tokenName);
  }
}