import {Component, AfterViewInit, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/storage/token.storage.service';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeRoute implements OnInit{
  public authority: string;

  constructor(private tokenStorage: TokenStorageService, private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    if(!this.tokenStorage.getToken){
      this.router.navigate(['']);
    }
  }
  logOut(): void{
    this.auth.logOunt();
    this.tokenStorage.signOut();
    this.router.navigate(['']);
  }
}









