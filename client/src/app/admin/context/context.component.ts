import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { Router } from '@angular/router';
import {ContextService} from './context.service' ;
import swal from 'sweetalert2';
@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss'],
  providers : [ ContextService ]
})
export class ContextComponent implements OnInit {
  context:any ={};
  synonym:any;
  setDomain:any;
  intent : any ;
  selectSubInt : any;
  selectedSubIntent : any = {name : "Select SubIntent",value : ""};
  dropdownSettings = {};

  dropdownSubIntentSettings = {};
  dropdownSettingsContext:any={};
  completeContext : any =[];
  addvideolink:any=[];
  addbloglink:any=[];
  selectIntent = [];
  videolink :any= [];
  contextName:any=[];
  res:any={};
  description :any=[];
  ref:any={};
  intents : any = [];
  subIntents : any = [];
  contexts : any = [];
  selectedEditContext : any = [];
  video :any = [];
  link : any = [];
  contextSyn:any=[];
  selectedIntent : any =[];
  contextDropDown:any=[];
  contextval:any;
  getContextName:any;
  getContextLabel:any;
  selectedItemsContext:any=[];
  selectedContext : any = {name : "Add to", label : ""};
  addSynonym:any;
  getInfo:any=[];
  item:any[]=[];
  flowdropdownSettings:any = {};
  flowitem:any[] = [];
flowflag:boolean = false;
  constructor(private contextService: ContextService, private router : Router) { }
  ngOnInit() {

    this.getcontent();
    //this.getContext();
    this.contextService.getIntent().subscribe((ref) => {
      ref.map((intent)=> {
        if(intent._fields[0].labels[0] == "Intent" && intent._fields[0].properties.name != 'type'){
          this.intents.push({id:this.intents.length+1,itemName : intent._fields[0].properties.name,name : intent._fields[0].properties.name, priority : intent._fields[0].properties.priority, value : "", videoLink : [], blogLink : [], subIntent : []});
        }
        else if(intent._fields[0].labels[0] == "SubIntent"){
          this.subIntents.push({id:this.subIntents.length+1,itemName : intent._fields[0].properties.name,name : intent._fields[0].properties.name, priority : intent._fields[0].properties.priority, value : ""});
        }
      })
    })
    this.contextService.getAllContext().subscribe((ref) => {
      ref.map((context)=> {
        if(context._fields[0].labels[0] == 'Entity' || context._fields[0].labels[0] == 'Domain' || context._fields[0].labels[0] == 'SubDomain'){
          this.contexts.push({name : context._fields[0].properties.name, label : context._fields[0].labels[0]});
        }
      })
      console.log('Subintent', this.subIntents);
    })
    this.dropdownSettings = { 
      singleSelection: true, 
      text:"Select Intent",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };    


    this.dropdownSubIntentSettings = {
      singleSelection: true, 
      text:"Select SubIntent",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    }  
    this.dropdownSettingsContext = { 
      singleSelection: true, 
      text:"Select Context",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    }; 

    this.flowdropdownSettings = {
      singleSelection: true, 
      text:"Select SubIntent",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    }             
  }
  

//funtion to fetch flows
 getcontent() {
    this.contextService.fetchflow()
    .subscribe((data) => {
      this.item = data;
      this.item.map((data) => {
        this.flowitem.push({itemName : data.task});
      })
    })
  }

  setdomain() {
    this.setDomain = true;
  }
  resetDomain() {
    this.selectedContext.name = "Add to";
    this.setDomain = false;
  }
  setContext(context) {
    this.selectedContext = context;

  }

  onItemSelect(item:any){
    this.selectedIntent.push(item);
    console.log('item here',this.selectedIntent);
    this.intents.splice(this.intents.indexOf(item),1);
  }
  flowtask:any;

  onItemFlowSelect(item:any,index){
     console.log(item);
     this.selectedIntent[index].flow = item;
     console.log("sdfsdfsdfwsssssss",this.selectedIntent)
  }


  OnItemDeSelect(item:any){
    this.selectSubInt = undefined;
    this.selectedSubIntent = undefined;
  }

  onItemSelectContext(item:any){   
    this.contextval=item;
    this.getContextLabel=item.label;
    this.getContextName=item.itemName;
  }

  addOneContext(selectedIntent) {
    this.completeContext.push(selectedIntent);
    this.inputs = [{link : ""}];
    this.blog = [{link : ""}];
    this.addvideolink=[];
    this.addbloglink=[];
  }


  addflowtask(flowname) {
    this.contextService.addflowtask(flowname)
    .subscribe((res)=> {
      console.log("==========",res);
    })
  }

  submitContext() {
    console.log('Complete intent', this.selectedIntent);
    if(this.setDomain != undefined) {
      if((this.setDomain == true && this.selectedContext.name != "Add to") || this.setDomain == false) {
        this.contextService.submitContext(this.context,this.selectedIntent,this.synonym,this.selectedContext)
        .subscribe((ref) => {
          console.log('ref', ref);
          if(ref.status == true){
            alert("Context added successfully");
            this.context = {};
            this.synonym = [];
            this.selectedContext = [];
            this.completeContext = [];
          }
          else {
            alert("error in creating a context node");
          }
        })
      }
      else {
        alert("Please add dependent context first");
      }
    }
    else {
      alert("Please select any Option Domain/Add to Context");
    }
  }


  removeVideo(i,j,video){
    this.inputs.splice(this.inputs.indexOf(video),1);
    this.selectedIntent[i].videoLink.splice(j,1);
  }

  inputs = [{link : ""}];
  addInput()  {
    this.inputs.push({link: ''});
  }

  blog = [{link : ""}];
  addBlog()  {
    this.blog.push({link: ''});
  }

  removeBlog(i,k,blog){
    this.blog.splice(this.blog.indexOf(blog),1);
    this.selectedIntent[i].blogLink.splice(k,1);
  }


  setsubIntent(subIntent) {
    this.selectedSubIntent = Object.assign({},subIntent);

  }


  pushSubIntent(index,subIntent) {
    console.log("seleted context",subIntent);

    let suI =  this.selectedIntent[index].subIntent.find(x => x.name === subIntent.name );
    console.log("find o/p", suI)
    if(suI==undefined){
      this.selectedIntent[index].subIntent.push({"name":subIntent.name, "value":subIntent.value})
    }
    else{
      this.selectedIntent[index].subIntent.map((suIn)=>{
        console.log('hello3', suIn)
        if(suIn.name===suI.name){
          suIn.value=subIntent.value;
        }

      })
    }

    this.selectedSubIntent.value = "";
    this.selectedSubIntent.name = "Select SubIntent";
  }
}