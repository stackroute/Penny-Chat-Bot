import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CreateFlowService } from './create-flow.service';

@Component({
  selector: 'app-create-flow',
  templateUrl: './create-flow.component.html',
  styleUrls: ['./create-flow.component.scss'],
  providers : [CreateFlowService]
})
export class CreateFlowComponent implements OnInit {

  constructor(private router:Router, private service:CreateFlowService) { }
  flowname:any;
  ngOnInit() {
    this.getcontent();
  }
  item:any[] = [];
  follow(flowname) {
  	let sample = {
  		task : flowname
  	}
  	this.item.push(sample);
    this.flowname = "";
  }

  addconfig(name) {
  	this.router.navigate(['/admin/traindomain',name,"new"])
  }

  editconfig(name) {
    this.router.navigate(['/admin/traindomain',name,"edit"])
  }

  getcontent() {
    this.service.fetch()
    .subscribe((data) => {
      this.item = data;
    })
  }


}
