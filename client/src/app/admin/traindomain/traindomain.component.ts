import { Component, OnInit } from '@angular/core';
import { TraindomainService} from './traindomain.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ActivatedRoute,Router } from '@angular/router';
import  Config from './traindomain_en_config';

/*Component for train Domain */
@Component({
  selector: 'app-traindomain',
  templateUrl: './traindomain.component.html',
  styleUrls: ['./traindomain.component.scss'],
   providers:[TraindomainService]
})
export class TraindomainComponent implements OnInit {
 value:any;
 Config:any=Config;
 productdata:any = {question : []};
 type:any[];
 ansType:any[] = [];
  constructor(private traindomainService:TraindomainService, private routeparams:ActivatedRoute, private router:Router) { }
op:any;


  ngOnInit() {
    this.type = [{value : Config.ques.intro},
    {value : Config.ques.quest},
      {value : Config.ques.conclusion}]
     this.ansType = [{value : Config.ques.yesno},
    {value : Config.ques.mcq},
      {value : Config.ques.number}]
      this.value=this.routeparams.params.subscribe((para)=>{ 
      this.productdata.task=para.name;
      this.op = para.op;
      if(this.op == Config.ques.edit) {
        this.editdata(para.name);
      }
    })
  }

editdata(name) {
  this.traindomainService.getdata(name).subscribe((res) => {
    this.productdata = res;
  })
}

  tempid:any=0;
  tempdata:any = {};
  getDetail(data) {
    if (data==Config.ques.intro) {
      this.tempid = this.setId();
      this.tempdata = {genre : Config.ques.intro, id : this.tempid, type : Config.ques.type1};
    } else if (data == Config.ques.quest) {
      this.tempid = this.setId();
      this.tempdata = {genre : Config.ques.quest, id : this.tempid, type : Config.ques.type1};
    } else {
      this.tempid = this.setId();
      this.tempdata = {genre : Config.ques.conclusion, id : this.tempid, type :Config.ques.type1};
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
    if(data.genre == Config.ques.quest || data.genre == Config.ques.intro || data.genre == Config.ques.conclusion) {
      m++;
      
    }
  })
  return ++m;
}

answerflow:any[] = [];

setnext(data) {
  this.nextquestion = data;
  this.productdata.question.map((data)=> {
      if(data.genre == Config.ques.quest || data.genre == Config.ques.conclusion) {
        this.questionarr.push(data);
      }
    })
    let index = this.questionarr.indexOf(data);
    if(index > -1) {
      this.questionarr.splice(index,1);
    }
  if (data.answertype == Config.ques.yesno) {
    this.answerarr = [Config.ques.yes,Config.ques.no];
  } else if(data.answertype = Config.ques.mcq) {
    for(let i=1;i<=data.option.length;i++) {
      this.answerarr.push(i);
    }
  }
}


input:any;
next:any;

addanswerflow(input,next) {
   let sample = {
      input : input,
      next : parseInt(next)
    }
    this.answerflow.push(sample);
    if(input == Config.ques.remain) {
      this.answerarr = [];
    } else  {
    let index = this.answerarr.indexOf(parseInt(input));

            if(index > -1) {
              this.answerarr.splice(index,1);
            }  
    }
    this.input = "",
    this.next = "";
 }

arrangeAnswer() {
  if(this.answerflow.length > 0) {
    if(this.nextquestion.genre == Config.ques.intro) {
      for(let i=0;i<this.productdata.question.length;i++) {
        if(this.productdata.question[i].id == this.nextquestion.id && this.productdata.question[i].type != Config.ques.type1) {
          this.answerflow.map((data) => {
            if(data.input == Config.ques.yes && this.productdata.question[i].answer == Config.ques.ayes) {
              this.productdata.question[i].next = data.next;
            } else if(data.input == Config.ques.no && this.productdata.question[i].answer == Config.ques.ano) {
               this.productdata.question[i].next = data.next;
            }
          })
        }
      }
    } else {
    this.answerflow.map((data) => {
      if(data.input != Config.ques.remain) {
       let sample = {
      id : this.nextquestion.id,
      input : data.input,
      type : Config.ques.type2,
      answer : true,
      next : data.next
    }
    this.productdata.question.push(sample);
    }
    })
  }
}
  this.questionarr = [];
  this.answerarr = [];
  this.answerflow= [];
}

  setAnstype(data,main) {
    this.tempdata.answertype = data;
    if(data==Config.ques.yesno && main==Config.ques.intro) {
      let yes =  { id : this.tempid,
         answer : Config.ques.ayes,
         exit : false
      }
      let no =  { id : this.tempid,
         answer : Config.ques.ano,
         exit : false
      }
      this.tempflow.push(yes);
      this.tempflow.push(no);
    } else if(data==Config.ques.yesno&& main == Config.ques.quest) {
      let fall = {
        id : this.tempid,
        answer : false,
        message : Config.ques.msg1,
        type : Config.ques.type3,
        next : this.tempid
      }
      //this.tempflow.push(main);
      this.tempflow.push(fall);
    } else if(data==Config.ques.mcq) {
      this.tempdata.option = [{id : 1, value : ""},{id : 2, value : ""}]
     
      let fall = {
        id : this.tempid,
        answer : false,
        message : Config.ques.msg1,
        type : Config.ques.type3,
        next : this.tempid
      }
     // this.tempflow.push(main);
      this.tempflow.push(fall);
    } else if(data==Config.ques.yesno && main==Config.ques.conclusion) {
       let yes =  { id : this.tempid,
         answer : Config.ques.ayes,
          exit : false
      }
      let no =  { id : this.tempid,
         answer : Config.ques.ano,
          exit : false
      }
      this.tempflow.push(yes);
      this.tempflow.push(no);
    }
  }

  addOption() {
    let main = {id : this.tempdata.option.length + 1,value : ""}
    this.tempdata.option.push(main);
  }

  setIntro() {
    this.productdata.question.push(this.tempdata);
    this.tempflow.map((data) => {
      this.productdata.question.push(data);
    })
    this.tempdata = {};
    this.tempflow = [];
  }


  setQuestion() {
    this.productdata.question.push(this.tempdata);
    this.tempflow.map((data) => {
      this.productdata.question.push(data);
    })
    this.tempdata = {};
    this.tempflow = [];
  }


  result(data) {
    this.productdata.result = data;
  }

  save() {
    this.traindomainService.save(this.productdata)
    .subscribe((data) => {
      this.router.navigateByUrl('/admin/createflow');
    })
  }
}