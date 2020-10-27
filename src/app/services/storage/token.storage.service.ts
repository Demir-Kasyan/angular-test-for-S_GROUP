import { Injectable } from '@angular/core';
const REQUEST_KEY = 'RequestObject';
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
 
  private role: string = '';
  constructor() { }
  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveAuthorities(authorities: string): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, authorities);
  }
  public getAuthorities(): string {
    this.role = '';
    if (sessionStorage.getItem(TOKEN_KEY)) {
      this.role = sessionStorage.getItem(AUTHORITIES_KEY);
    }
    return this.role;
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUsername(username: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }
  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }
  public saveRequest(request: string) {
    window.sessionStorage.removeItem(REQUEST_KEY);
    window.sessionStorage.setItem(REQUEST_KEY, request);
  }
  public getRequest(): string {
    return sessionStorage.getItem(REQUEST_KEY);
  }
}
