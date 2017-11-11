import { Component ,OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit{

	initialCharacter : any;

	ngOnInit(){		
      let data = JSON.parse(localStorage.getItem('Userdata'));
      this.initialCharacter = data.data.name;
	}

 }
