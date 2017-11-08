import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-chat',
  templateUrl: './bottom-chat.component.html',
  styleUrls: ['./bottom-chat.component.css']
})
export class BottomChatComponent implements OnInit {
	config;
 buttons: any= [
    {
      iconClass: 'ion-social-github',
      label: 'follow me on github',
      onClick: function() {
      	window.open(document.URL, '/', 'location=yes,height=570,width=520,scrollbars=yes,status=no');
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
    {
      value: 'mfb-zoomin',
      key: 'Zoom In'
    },
    {
      value: 'mfb-slidein',
      key: 'Slide In + Fade'
    },
    {
      value: 'mfb-fountain',
      key: 'Fountain'
    },
    {
      value: 'mfb-slidein-spring',
      key: 'Slide In (Spring)'
    }
  ];

  toggles = [
    'click',
    'hover'
  ];

  constructor() { 
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
