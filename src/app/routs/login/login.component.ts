import { Component, OnInit } from '@angular/core';
import { LoginInfo } from 'src/app/interfaces/login.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/storage/token.storage.service';
import {Router} from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginRoute implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password: string;
  hide = true;
  public authority: string;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authority = this.tokenStorage.getAuthorities();
      if ( this.authority ){
        this.router.navigate(['home']);
      }
  }
}
  onSubmit(): void {
    this.authService.attemptAuth({
      email: this.email.value,
      password: this.password
    } as LoginInfo);
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}