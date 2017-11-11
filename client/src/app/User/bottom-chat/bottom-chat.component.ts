import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bottom-chat',
  templateUrl: './bottom-chat.component.html',
  styleUrls: ['./bottom-chat.component.css']
})
export class BottomChatComponent implements OnInit {

	config;
  buttons: any= [
  {
    iconClass: 'fa fa-home',
    label: 'Home',
    onClick: ()=> {
      this.router.navigateByUrl('user/dashboardUser');
    }
  },
  {
    iconClass: 'fa fa-comment',
    label: 'Chat with us',
    onClick: () => {
      this.router.navigateByUrl('user/chat');
      //window.open(document.URL, '/user/chat', 'location=yes,height=570,width=520,scrollbars=yes,status=no');
    }
  },
  {
    iconClass: 'fa fa-sign-out',
    label: 'Logout',
    onClick: ()=> {
      localStorage.removeItem('Userdata');
      localStorage.removeItem('key');
      localStorage.removeItem('isLoggedin');
      this.router.navigateByUrl('/login');
    }
  },
  ];

  placements = [
  {
    value: 'br',
    key: 'bottom right'
  },
  {
    value: 'bl',
    key: 'bottom left'
  },
  {
    value: 'tr',
    key: 'top right'
  },
  {
    value: 'tl',
    key: 'top left'
  },
  ];

  effects = [
  /*{
    value: 'mfb-zoomin',
    key: 'Zoom In'
  },*/
 /* {
    value: 'mfb-slidein',
    key: 'Slide In + Fade'
  },*/
  /*{
    value: 'mfb-fountain',
    key: 'Fountain'
  },*/
  /*{
    value: 'mfb-slidein-spring',
    key: 'Slide In (Spring)'
  }*/
  ];

  toggles = [
  'click',
  'hover'
  ];

  constructor(private router : Router) { 
  	this.config = {
      placment: 'br',
      effect: 'mfb-slidein-spring',
      label: 'main button label',
      iconClass: 'icon ion-plus-round',
      activeIconClass: 'ion-close-round',
      toggle: 'hover'
    }
  }

  ngOnInit() {
  }

}
