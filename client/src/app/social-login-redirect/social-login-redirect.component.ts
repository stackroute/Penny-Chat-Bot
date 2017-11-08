import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-social-login-redirect',
  templateUrl: './social-login-redirect.component.html',
  styleUrls: ['./social-login-redirect.component.css'],
  providers:[CookieService]
})

export class SocialLoginRedirectComponent implements OnInit {
  cookieValue : any;
  userdata : any;

  constructor( private cookieService: CookieService, private router : Router) {}
 // on page initialising we will get data from localStorage
  ngOnInit() {
    // if data is available in cookie or not?

    this.cookieValue = this.cookieService.get('Userdata'); // retriving data from cookie
    this.userdata = JSON.parse(this.cookieValue.slice(2,this.cookieValue.length));
    localStorage.setItem('Userdata',JSON.stringify(this.userdata)); // store data to local storage
    this.router.navigateByUrl('/user');  // navigate to /user
  }
}
