import { Component ,OnInit } from '@angular/core';
import {Config} from  './app-header.config'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls:['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit{

	initialCharacter : any;

	ngOnInit(){		
      let data = JSON.parse(localStorage.getItem(Config.localStorage));
      this.initialCharacter = data.data.name;
	}

 }
