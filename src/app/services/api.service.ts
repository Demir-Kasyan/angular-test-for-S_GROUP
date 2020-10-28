import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTPService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService{
  constructor(private _HTTP: HTTPService){}

  getFormFields(page?: number, per_page?: number, order_by?: string, order_direction?: string): Observable<any> {
    return this._HTTP.get(`form_fields?`+
                         (page?`page=${page+1}`:``)+
                         (per_page?`&per_page=${per_page}`:``)+
                         (order_by?`&order_by=${order_by}`:``)+
                         (order_direction?`&order_direction=${order_direction}`:``));
  }
  getForms(page?: number, per_page?: number, order_by?: string, order_direction?: string, search?: string,filters?: string): Observable<any> {
    return this._HTTP.get(`forms?`+
                         (page?`page=${page+1}`:``)+
                         (per_page?`&per_page=${per_page}`:``)+
                         (order_by?`&order_by=${order_by}`:``)+
                         (order_direction?`&order_direction=${order_direction}`:``)+
                         (search?`&search=${search}`:``)+
                         (filters?`&filters=${filters}`:``));
  }
  getForm(idValue: number): Observable<any> {
      return this._HTTP.get('forms/'+idValue);
    }
  updateForm(idValue: number, body: any): Observable<any> {
        return this._HTTP.post('forms/'+idValue,body);
    }
  createForm( body: any): Observable<any> {
        return this._HTTP.post('forms', body);
    }
  deleteForm(idValue: number): Observable<any> {
        return this._HTTP.delete('forms/'+idValue);
    }
}
