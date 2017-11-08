import { Component, OnInit } from '@angular/core';
import { AddtaskService } from './addtask.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss'],
  providers : [AddtaskService]
})
export class AddtaskComponent implements OnInit {

	task:any={};
	data:any=[];
  res:any;
	question : any ;
	postitiveresponse : any;
	negativeresponse : any;
  item1:any="Yes/No";
    item2:any="Alphabetic";
      item3:any="Numeric";

  constructor(private addtaskservice : AddtaskService) { }

  ngOnInit() {
    console.log(this.item1,this.item2)
  }

  AddQuestion(){

  	if(this.data.length ==0){
  		this.data.push({'TaskName' : this.task.name});
  	}

  	let question = {
  		id : this.data.length,
  		question : this.task.question,
  		answertype : this.task.answertype,
  		type : 'Q'
  	}

  	let positiveresponse = {
  		id : this.data.length ,
  		answer : this.task.answer,
  		question : this.task.response,
  		next : this.task.nextstep
  	}

  	let negativeresponse = {
  		id : this.data.length ,
  		answer : this.task.nanswer,
  		question : this.task.negativeResponse,
  		next : this.task.negativenextstep
  	}


  	this.data.push({question},{positiveresponse},{negativeresponse});
  	console.log(this.data);
  	this.task = "";
  }

  Submit(){
  	this.addtaskservice.Submit(this.data).subscribe((res)=>res)
  }

}
