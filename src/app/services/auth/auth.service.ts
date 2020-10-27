import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInfo } from 'src/app/interfaces/login.interface';
import { HTTPService } from '../http.service';
import { TokenStorageService } from '../storage/token.storage.service';
import { SignInInfo } from 'src/app/interfaces/signin.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HTTP: HTTPService, private tokenStorage: TokenStorageService, private toastr: ToastrService, private router: Router) {
  }

  attemptAuth(credentials: LoginInfo): void {
    this.merge(this._HTTP.post('auth/login', credentials));
  }
  refreshAuth(): void {
    this.merge(this._HTTP.post('auth/refresh'));
  }
  private merge( obs: Observable<any> ): void{
    obs.subscribe(data => {
      this.tokenStorage.saveRequest(data);
      this.tokenStorage.saveToken(data.access_token);
      this.tokenStorage.saveUsername(data.user.name);
      this.tokenStorage.saveAuthorities(data.type);
      window.location.reload();
      this.toastr.success('Authorization success','Hi,'+data.user.name);
    },
    error => {
      if (error.status==403){
        this.toastr.error('Authorization rejected','403');
      }
      else if (error.status==422){
        this.toastr.error('Validation error','422');
      }
       else if (error.status==500){
        this.toastr.error('Server error','500');
        this.tokenStorage.signOut();
        this.router.navigate(['']);
      }
    }
    );
  }

}
