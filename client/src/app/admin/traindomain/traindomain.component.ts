import { Component, OnInit } from '@angular/core';
import { TraindomainService} from './traindomain.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ActivatedRoute,Router } from '@angular/router';

/*Component for train Domain */
@Component({
  selector: 'app-traindomain',
  templateUrl: './traindomain.component.html',
  styleUrls: ['./traindomain.component.scss'],
   providers:[TraindomainService]
})
export class TraindomainComponent implements OnInit {
 value:any;
 productdata:any = {question : []};
 type:any[];
 ansType:any[] = [];
  constructor(private traindomainService:TraindomainService, private routeparams:ActivatedRoute, private router:Router) { }
op:any;


  ngOnInit() {
    this.type = [{value : "Introduction"},
    {value : "Question"},
      {value : "Conclusion"}]
     this.ansType = [{value : "Yes/No"},
    {value : "MCQ"},
      {value : "Number"}]
      this.value=this.routeparams.params.subscribe((para)=>{ 
      this.productdata.task=para.name;
      this.op = para.op;
      console.log("op here",this.op);
      if(this.op == "edit") {
        this.editdata(para.name);
      }
    })
  }

editdata(name) {
  console.log(name);
  this.traindomainService.getdata(name).subscribe((res) => {
    console.log("response",res);
    this.productdata = res;
  })
}

  tempid:any=0;
  tempdata:any = {};
  getDetail(data) {
    console.log(data);
    if (data=="Introduction") {
      this.tempid = this.setId();
      this.tempdata = {genre : "Introduction", id : this.tempid, type : "Q"};
   //  this.setNext();
      // this.productdata.question.push();
    } else if (data == "Question") {
      this.tempid = this.setId();
      this.tempdata = {genre : "Question", id : this.tempid, type : "Q"};
     // this.setNext();
    } else {
      this.tempid = this.setId();
      this.tempdata = {genre : "Conclusion", id : this.tempid, type : "Q"};
    //  this.setNext();
    }
  }
tempflow:any[] = [];

nextquestion:any;  
answerarr:any[] = [];
questionarr:any[] = [];

setId() {
  let m = 0;
  this.productdata.question.map((data) => {
    if(data.genre == "Question" || data.genre == "Introduction" || data.genre == "Conclusion") {
      m++;
      
    }
  })
  return ++m;
}

answerflow:any[] = [];

setnext(data) {
  console.log("00000000",data);
  this.nextquestion = data;
  this.productdata.question.map((data)=> {
      if(data.genre == "Question" || data.genre == "Conclusion") {
        this.questionarr.push(data);
      }
    })
    let index = this.questionarr.indexOf(data);
    if(index > -1) {
      this.questionarr.splice(index,1);
    }
  if (data.answertype == "Yes/No") {
    this.answerarr = ["Yes","No"];
  } else if(data.answertype = "MCQ") {
    for(let i=1;i<=data.option.length;i++) {
      this.answerarr.push(i);
    }
   // this.answerarr[this.answerarr.length] = "Remains";
  }
}


input:any;
next:any;

addanswerflow(input,next) {
   let sample = {
      input : input,
      next : next
    }

  console.log("sameplae",sample);
    this.answerflow.push(sample);
    if(input == "Remains") {
      this.answerarr = [];
    } else  {
    let index = this.answerarr.indexOf(parseInt(input));

    console.log(input,this.answerarr);
            if(index > -1) {
              this.answerarr.splice(index,1);
            }  
    }
    this.input = "",
    this.next = "";
 }

arrangeAnswer() {
  if(this.answerflow.length > 0) {
    if(this.nextquestion.genre == "Introduction") {
      for(let i=0;i<this.productdata.question.length;i++) {
        if(this.productdata.question[i].id == this.nextquestion.id && this.productdata.question[i].type != "Q") {
          this.answerflow.map((data) => {
            if(data.input == "Yes" && this.productdata.question[i].answer == "Yes") {
              this.productdata.question[i].next = data.next;
            } else if(data.input == "No" && this.productdata.question[i].answer == "No") {
               this.productdata.question[i].next = data.next;
            }
          })
        }
      }
    } else {
    this.answerflow.map((data) => {
      if(data.input != "Remains") {
       let sample = {
      id : this.nextquestion.id,
      input : data.input,
      type : "T",
      answer : true,
      next : data.next
    }
    this.productdata.question.push(sample);
    console.log(this.productdata)
    }
    })
    console.log(this.productdata.question);
  }
}
  this.questionarr = [];
  this.answerarr = [];
  this.answerflow= [];
}

  setAnstype(data,main) {
    console.log("Answertype",data);
    this.tempdata.answertype = data;
    if(data=="Yes/No" && main=="Introduction") {
      let yes =  { id : this.tempid,
         answer : "Yes",
         exit : false
      }
      let no =  { id : this.tempid,
         answer : "No",
         exit : false
      }
      this.tempflow.push(yes);
      this.tempflow.push(no);
      console.log(this.tempflow);
    } else if(data=="Yes/No" && main == "Question") {
      let fall = {
        id : this.tempid,
        answer : false,
        message : "Oops! Thats not a Valid Input. Kindly Enter Valid Input.",
        type : "F",
        next : this.tempid
      }
      //this.tempflow.push(main);
      this.tempflow.push(fall);
    } else if(data=="MCQ") {
      this.tempdata.option = [{id : 1, value : ""},{id : 2, value : ""}]
     
      let fall = {
        id : this.tempid,
        answer : false,
        message : "Oops! Thats not a Valid Input. Kindly Enter Valid Input.",
        type : "F",
        next : this.tempid
      }
     // this.tempflow.push(main);
      this.tempflow.push(fall);
    } else if(data=="Yes/No" && main=="Conclusion") {
       let yes =  { id : this.tempid,
         answer : "Yes",
          exit : false
      }
      let no =  { id : this.tempid,
         answer : "No",
          exit : false
      }
      this.tempflow.push(yes);
      this.tempflow.push(no);
      console.log(this.tempflow);
    }
  }

  addOption() {
    let main = {id : this.tempdata.option.length + 1,value : ""}
    this.tempdata.option.push(main);
  }

  setIntro() {
    console.log("skalfjkglfd",this.tempdata);
    this.productdata.question.push(this.tempdata);
    console.log("ssssssssss",this.tempflow);
    this.tempflow.map((data) => {
      this.productdata.question.push(data);
    })
    this.tempdata = {};
    this.tempflow = [];
  }


  setQuestion() {
    console.log("skalfjkglfd",this.tempdata);
    this.productdata.question.push(this.tempdata);
    console.log("ssssssssss",this.tempflow);
    this.tempflow.map((data) => {
      this.productdata.question.push(data);
    })
    this.tempdata = {};
    this.tempflow = [];
    console.log(this.productdata.question);
  }


  result(data) {
    this.productdata.result = data;
  }

  save() {
    this.traindomainService.save(this.productdata)
    .subscribe((data) => {
      console.log("server",data);
      this.router.navigateByUrl('/admin/createflow');
    })
  }
}
