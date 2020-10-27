import { Component} from '@angular/core';
import { TokenStorageService } from 'src/app/services/storage/token.storage.service';

@Component({
  selector: 'router',
  templateUrl: './_router.component.html',
  styleUrls: ['./_router.component.css'],
  providers: []
})

export class Router {
  authority: string;
  constructor(private tokenStorage: TokenStorageService) {}
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.authority = this.tokenStorage.getAuthorities()[0];
    }
  }
}
