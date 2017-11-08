import { Component,Input,Output, OnInit} from '@angular/core';
import { AsideService } from './app-aside.service';

@Component({
  selector: 'app-aside',
  templateUrl: './app-aside.component.html',
  styleUrls: ['./app-aside.component.css']
})
 //id:any="krjg55ekJUg";
export class AppAsideComponent implements OnInit{

	

  constructor(private asideService: AsideService) {
   }
   youid:any;
   youtubeid:any;
   ngOnInit()
   {
   	this.asideService.idEmitter.subscribe((ids) => {
   		console.log(ids);
   		this.youid = ids;
       this.youtubeid=ids[1];
       console.log("mohi",ids[1]);
       console.log("mohiiii",this.youid[1]);
       this.savePlayer(this.player);
       this.onStateChange(event);
   	})
   }


player: YT.Player;
  savePlayer (player) {
  this.player = player;
  console.log("zero",this.player)
  console.log("one",this.youid[1]);
  console.log('player instance', player)
  }
onStateChange(event){
  console.log("two",this.youid)
  console.log('player state', event);
}
}