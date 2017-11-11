import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { Config } from './dashboard_en_config';

import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent { 
  Config:any=Config;
  constructor(){};
  ngOnInit(){};

}
/*export class DashboardComponent implements OnInit {
  Config:any=Config;
  ref:any={};
  arr:any=[];
  intentName:any=[];
  contextName:any=[];
  question:any = 'Question';
  intent:any;
  context:any;
  intentValue:any;
  contextValue:any;
  flag:any=0;
  intentWord:any;
  contextWord:any;
  len:any;
  res:any={};
  type:any;
  word:any;
  typename:any;
  tableData: any = [];
  index:any;
  array:any=[];
 object:any ={}; 
   editflag:any;
  syn:any;
val:any; 
contexttype:any;
resp:any;
  refer:any;
  addintent:any;
  labelname:any;
  temp:any;
  synres:any;
  main:any=[];

  constructor(private dashboardservice:DashboardService, private router: Router) { }

//----------ngOnInIt-------------
  ngOnInit() {
    this.getunanswer();
    this.getIntent();
    this.getContext();
  }

//----------getunanswer method-------------
  getunanswer(){
    this.dashboardservice.getunanswer()
    .subscribe((res)=>{
      this.ref=res[0].questions;
    //  console.log(res[0].questions)
      res[0].questions.map((ques)=>{
      //  console.log(ques.question);
        this.arr.push(ques.question)
      })
    })
  }

//----------getQues method------------
getQues(ques){

   this.dashboardservice.getQues(ques).subscribe((res)=>{
     this.tableData = [];
     res.map((data)=>{
       if(data.word == "")
         this.word = "Not Found";
       else
         this.word = data.word;

       if(data.type == "")
         this.type = "Not Found";
       else
         this.type = data.type;

       if(data.typename == "")
         this.typename = "Not Found";
       else
         this.typename = data.typename;

         this.tableData.push({word : this.word , type : this.type , typename : this.typename})
        // console.log("Table Data" , this.tableData);
     })
     //console.log("Table Data" , this.tableData);
     
   })
   this.question = ques;
 }

  getIntent(){
    this.dashboardservice.getIntent()
    .subscribe((res)=>{
      //console.log('huihuhu  ',res)
      res.map((data)=>{
        data._fields.map((name)=>{
          this.intentName.push({
            label:name.labels[0],
            name:name.properties.name
          })
        })
      })
      this.res=res;
    })
  }


  getContext(){
    this.dashboardservice.getContext()
    .subscribe((res)=>{
         //console.log(res)
          res.map((data)=>{
            data._fields.map((name)=>{
              this.contextName.push(name.properties.name)
            })
        
      })
          console.log('context arra..',this.contextName)
      this.res=res;
    })
}


// changeto(ref:any,type:any) {
//      console.log(this.ref);
//      this.editflag = this.refer[0].type;
//    } 


//   change(object){

//       this.dashboardservice.changeIntent(this.refer).subscribe(res=>this.ref=res)

//   }

//    add(object){
//       this.dashboardservice.addSentence(this.rem)
//       .subscribe(res=>{
//         //console.log('componernt.. ',res);
//         this.ref=res})
//   }

setSynonym(intent){
  this.dashboardservice.setSynonym(intent,this.val)
      .subscribe(res=>{
    alert('added succesfully')    
    this.ref=res})
}

contextSynonym(context){

 console.log(this.tableData);
  this.dashboardservice.contextSynonym(this.contexttype,this.val)
  .subscribe(res =>{
    alert('added successfully');
      console.log('context.. ' ,res)
    this.ref=res
  })
}

sendques(question){
 // console.log("question",question)
  this.dashboardservice.sendques(question)
      .subscribe(res=>{
   // alert('added succesfully')    //console.log('componernt.. ',res);
        this.ref=res})
}

  remove(index,data) {
    this.tableData.splice(this.tableData.indexOf(data),1);   
  }


  call(value,type) {
    this.val=value;
    this.contexttype=type;
  }
  addIntent(){
  this.dashboardservice.addIntent(this.addintent)
  .subscribe((res)=>{
     if (res.status==true)
    {
       this.resp=res;
      alert('add succesfully')
    }
  
  })
}

addSynonym(){
  const data= {
    labelname : this.addintent,
    syn:this.main
  }
  this.dashboardservice.addSynonym(data)
  .subscribe((ref)=>{
    if (ref.status==true)
    {
      this.refer=ref;
      alert('add succesfully')
    }
    
  })
}

suggest(){
  const data= {
    labelname : this.addintent,
    word:this.temp
  }
  this.dashboardservice.suggest(data)
  .subscribe((ref)=>{
    this.synres=ref;
  })
}
select(val){
  this.temp=val;
  this.main.push(val);
}
}*/