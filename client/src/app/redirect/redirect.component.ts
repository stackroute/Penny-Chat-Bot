
import { Component, OnInit } from '@angular/core';
import { RedirectService } from './redirect.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from './redirect_en_config';
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
  providers: [RedirectService]
})
export class RedirectComponent implements OnInit {

  sub:any;
  id:number;
  userdata:any;
  flag:number;
  Config:any=Config;
  
  constructor(private redirectService:RedirectService, private route:ActivatedRoute, private router:Router) { }


/*----method to login page otherwise give warning after email verification-----*/
  redirectUrl(){
  	this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      /*----fetch Id from Url----*/
    });

  	this.redirectService.redirectUrl(this.id)
  	.subscribe((params) => {
      if(params.message=="verified"){
        //if verified set data to localstorage
        this.flag=1;
        //set data to localstorage
        this.router.navigateByUrl('');
        //navigate to login page after clicking on link sent on mail
      }
  });  	
  }

  ngOnInit() {
  	this.redirectUrl();
    }
  }

