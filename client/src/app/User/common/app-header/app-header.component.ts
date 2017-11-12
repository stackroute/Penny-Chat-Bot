import { Component ,OnInit } from '@angular/core';
import { Config } from './app-header_en_config';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './app-header.component.html',
	styleUrls:['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit{

config : any;
	initialCharacter : any;

	 constructor(private router : Router) { 
    //----------------set configuration for floating menu------------
    this.config = Config.bottomchat.thisconfig
  }

	ngOnInit(){		
		let data = JSON.parse(localStorage.getItem('Userdata'));
		this.initialCharacter = data.data.name;
	}

	logout(){
		localStorage.removeItem(Config.bottomchat.Userdata);
		localStorage.removeItem(Config.bottomchat.key);
		localStorage.removeItem(Config.bottomchat.isLoggedin);
		this.router.navigateByUrl('/login');
	}

}
