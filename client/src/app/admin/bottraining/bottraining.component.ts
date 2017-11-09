import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import {BottrainingService} from './bottraining.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-bottraining',
  templateUrl: './bottraining.component.html',
  styleUrls: ['./bottraining.component.scss'],
  providers: [BottrainingService]
})
export class BottrainingComponent implements OnInit {
  ref:any={};
  arr:any=[];
  rep:any;
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
  priority:any;
  correspondSynonym:any=[];
  adminSynonym:any;
  intentname:any;
  value:any;
  newQuestion:any;
  newgetQuestion:any;
  dropdownListIntent:any = [];
  selectedItemsIntent:any = [];
  dropdownSettingsIntent:any = {};
  dropdownSettingsContext:any={};
  selectedItemsContext:any=[];
  item:any[] = [];
  constructor(private bottrainingservice:BottrainingService, private router: Router) { }

  ngOnInit() {

    //Value selection in dropdown in intent
    this.dropdownSettingsIntent = {           
      singleSelection: true, 
      text:"Select Intent",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };

    //Value selection in dropdown in context 
    this.dropdownSettingsContext = {              
      singleSelection: true, 
      text:"Select Context",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };

    this.getunanswer();
    this.getIntent();
    this.getContext();
  }
  


  //Function called when an item is selected in dropdown in intent
  onItemSelectIntent(item:any){                  
    this.relatedentity(item);
  }
  //Function called when an item is deselected in dropdown in intent
  OnItemDeSelectIntent(item:any){                    
    this.selectedItemsIntent = [];
    this.correspondSynonym = [];
    this.intentname = "";
  }
  //Function called when an item is selected in dropdown in context
  onItemSelectContext(item:any){                
    this.onItemSelectContext=item;
  }
  //Function called when an item is deselected in dropdown in intent
  OnItemDeSelectContext(item:any){              
  } 
  //Function called when the pageis rendered to get the unanswered questions
  getunanswer(){
    this.bottrainingservice.getunanswer()
    .subscribe((res)=>{
      console.log("dfdsfsd fdsa sdfsda fsdfsd     "       ,    res    );
      this.arr = [];
      this.ref=res[0].questions;
      console.log("gfsdgsdfgedsgfsdfsdf ",this.ref);
      res[0].questions.map((ques)=>{
        console.log("dfsfdasfsadsacash   "  ,  ques  )
        this.arr.push(ques.question)
      })
    })
  }
  //Displays the selected quesion in the table
  getQues(ques){                        
    this.newgetQuestion = ques;
    this.bottrainingservice.getQues(ques).subscribe((res)=>{
      this.rep=res;
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
      })
    })
    this.question = ques;
  }
//When called function displays all the intents and subintents
  getIntent(){
    this.bottrainingservice.getIntent()
    .subscribe((res)=>{
      this.intentName = [];
      res.map((data)=>{
        data._fields.map((name)=>{
          this.intentName.push({
            id : this.intentName.length+1,
            label:name.labels[0],
            itemName:name.properties.name,
            priority:name.properties.priority
          })
        })
      })
      this.res=res;
    })
  }
//When called function displays all the contexts present in the database
  getContext(){
    this.bottrainingservice.getContext()
    .subscribe((res)=>{
      console.log('827165223==========',res)
      res.map((data)=>{
        data._fields.map((name)=>{
          if(name.labels[0] != 'Video' && name.labels[0] != 'Link' && name.labels[0] != 'Counter'){
            this.contextName.push({id:this.contextName.length+1,label:name.labels[0],itemName:name.properties.name});
          }
        })
      })
      this.res=res;
      console.log('00000000000000000================',res)
    })    
  }
//When called function sets the synonyms of intent to the selected word from the unanswered question  
  setSynonym(intent){
    this.bottrainingservice.setSynonym(intent,this.val)
    .subscribe(res=>{    
      this.ref=res;
      this.getQues(this.newgetQuestion);
      this.relatedentity(this.selectedItemsIntent[0]);
      alert('added succesfully');
    })
  }
//When called function sets the synonym of the contexts to the seleted word from the unanswered question  
  contextSynonym(context){
    console.log('############',context);
    this.bottrainingservice.contextSynonym(context,this.val)
    .subscribe(res =>{
      alert('added successfully');
      this.getQues(this.newgetQuestion);
    //  this.relatedentity(this.selectedItemsIntent[0]);
      this.selectedItemsContext = [];
      this.ref=res
      console.log('**************888',res);
    })
  }
//This fnction allows the admin to add any unanswered question
  sendques(question){
    this.newQuestion = "";
    this.bottrainingservice.sendques(question)
    .subscribe(res=>{
      console.log('ankurrrr',res)
      this.getunanswer();
      this.ref=res})
  }
//This function allows the admin to remove the word once admin has added the details to it
  remove(index,data) {
    this.tableData.splice(this.tableData.indexOf(data),1);   
  }
//This function is used to pass the selected value into modal
  call(value,type) {
    this.selectedItemsIntent = [];
    this.correspondSynonym = [];
    this.intentname = "";
    this.val=value;
    this.contexttype=type;
    this.getQues(this.newgetQuestion);
  }
//This function is used to add a new intent into the database
  addIntent(){
    let flag=0;
    const data={
      label:this.value,
      labelname:this.addintent,
      priority:this.priority
    }
//This is o validate if all the fields are entered    
    if(this.addintent==undefined || this.priority ==undefined){
      swal('',"please fill the fields",'error');
    }
//To check if priority is already present in the database    
    else if(this.priority !=undefined){
      this.intentName.map((rep)=>{
        if(rep.priority == this.priority){
          flag++;
        }
      })
    }
    if(flag==0){
      this.bottrainingservice.addIntent(data)
      .subscribe((res)=>{
        this.rep=res;
        console.log('ankurrrr',res)
        if (res.status==true){
          this.resp=res;
          swal('',"Successfully Added",'success');
          this.getIntent();
        }  
      })
    }
    else{
      alert('Already existing prority');
    }
  }
//This function is used to add synonym to the newly created intent
  addSynonym(){
    const data= {
      label:this.value,
      labelname : this.addintent,
      syn:this.main
    }
//This is o validate if all the fields are entered 
    if(this.addintent==undefined || this.main ==undefined){
      swal('',"please fill the fields",'error');
    }else{
      this.bottrainingservice.addSynonym(data)
      .subscribe((ref)=>{
        //this.getIntent();
        if (ref.status==true)
        {
          this.value = "";
          this.addintent = "";
          this.main = [];
          this.refer=ref;
          this.priority="";
          this.temp = "";
          alert('add succesfully')
          this.router.navigateByUrl('/admin/trainingbot');
        }    
      })
    }  
  }
//This functon fetches all the synonyms of the selected intent
  relatedentity(intentName){
    this.intentname=intentName;
    this.bottrainingservice.getRelatedEntity(intentName)
    .subscribe((res)=>{
      this.correspondSynonym=res;
    })
  }
//This funcion adds all the synonym to the selected intent  
  addAdminSynonym()
  {  
    this.bottrainingservice.addMoreSynonym(this.adminSynonym,this.intentname)
    .subscribe((res)=>{
     // console.log('%%%%%%%%%%%%%%55',res)
      this.adminSynonym = "";
      this.correspondSynonym.push(res._fields[0].properties.name);
    })
  }
//This function deletes the synonym of the selected intent
  deletesynonym(syno){  
    this.bottrainingservice.deleteSynonym(syno,this.intentname)
    .subscribe((res)=>{
      this.rep=res;
      this.relatedentity(this.intentname);
    })
  }
//This function suggests the synonym of the entered alphabet or word
  suggest(){
    const data= {
      labelname : this.addintent,
      word:this.temp
    }
    this.bottrainingservice.suggest(data)
    .subscribe((ref)=>{
      this.synres=ref;
    })
  }
//This function stores the entered synonym in a variable
  select(val){
    this.temp=val;
    this.main.push(val);
    this.temp="";
  }
//This function deletes the selected intent from the database
  deleteIntent(intent){  
    this.bottrainingservice.deleteIntent(intent)
    .subscribe((res)=>{
      this.rep=res;
      this.selectedItemsIntent = [];
      this.correspondSynonym = [];
      this.intentname = "";
      this.getIntent();
    })
  }
  //This function remove the question from the table once the admin has answered 
  deletePendingQuestions(ques){
    this.bottrainingservice.deletePendingQuestions(ques)
    .subscribe((res) => {
      this.rep=res;
      this.getunanswer();
    });
  }
  //This function is used to tell which button has been selected
  ifselected(val){
    this.value=val;
  }
}