import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { LoginRequestPayload } from '../login/login.request.payload';
import { LoginResponse } from '../login/log.response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient, 
    private localStorgae: LocalStorageService) {
  }
  refreshTokenPayload= {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
    
  }
  signup(signupRequestPayload: SignupRequestPayload){
    return this.httpClient.post('http://localhost:8080/api/auth/signup'
    , signupRequestPayload, {responseType: 'text'});
  }
  login(loginRequestPayload: LoginRequestPayload): Observable<boolean>{
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login'
    , loginRequestPayload).pipe(map(data=>{
      this.localStorgae.store('authenticationToken', data.authenticationToken);
      this.localStorgae.store('username', data.username);
      this.localStorgae.store('refreshToken', data.refreshToken);
      this.localStorgae.store('expiresAt', data.expiresAt);
      
      return true;
    }));
  }

  getJwtToken(){
    return this.localStorgae.retrieve('authenticationToken');
  }

  refreshToken(){
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
    this.refreshTokenPayload)
    .pipe(tap(response => {
      this.localStorgae.clear('authenticationToken');
      this.localStorgae.clear('expiresAt');

      this.localStorgae.store('authenticationToken',
      response.authenticationToken);
      this.localStorgae.store('expiresAt', response.expiresAt);
    }));
  }

  getUserName(){
    return this.localStorgae.retrieve('username');
  }

  getRefreshToken(){
    return this.localStorgae.retrieve('refreshToken');
  }
}
