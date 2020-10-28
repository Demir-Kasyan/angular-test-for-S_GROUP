import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenStorageService} from './storage/token.storage.service';

@Injectable({
  providedIn: 'root'
})
export class HTTPService{
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService){}
  private href: string = 'https://test.s-group.vn.ua/api/v1/';

  post<T>(url: string, body?: any): Observable<T>{
    console.log(this.tokenStorage.getToken());
    return !body?this.http.post<T>(this.href+url,
      { headers: {'Access-Control-Allow-Origin': 'POST', Authorization: 'Bearer ' + this.tokenStorage.getToken() }}):
      this.http.post<T>(this.href+url, body,
        { headers: {'Access-Control-Allow-Origin': 'POST', Authorization: 'Bearer ' + this.tokenStorage.getToken() }});
  }
  get<T>(url: string): Observable<T>{
    return this.http.get<T>(this.href+url,
      { headers: {'Access-Control-Allow-Origin': 'GET', Authorization: 'Bearer ' + this.tokenStorage.getToken() }});
  }
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.href+url,
      { headers: {'Access-Control-Allow-Origin': 'GET', Authorization: 'Bearer ' + this.tokenStorage.getToken() }});
  }
}
