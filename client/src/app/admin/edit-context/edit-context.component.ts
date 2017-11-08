import { Component, OnInit } from '@angular/core';
import { EditContextService } from './edit-context.service';
import swal from 'sweetalert2';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-edit-context',
	templateUrl: './edit-context.component.html',
	styleUrls: ['./edit-context.component.scss'],
	providers:[EditContextService]
})
export class EditContextComponent implements OnInit {
  intentData : any=[];


  context:any ={};
  synonym:any;
  setDomain:any;
  intent : any ;
  dropdownSettings = {};
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
  flag:any=0;
  
	constructor(private editContextService:EditContextService, private router : Router ) { }


  ngOnInit() {
    this.getContext();
    this.editContextService.getIntent().subscribe((ref) => {
      ref.map((intent)=> {
        if(intent._fields[0].labels[0] == "Intent"){
          this.intents.push({id:this.intents.length+1,itemName : intent._fields[0].properties.name,name : intent._fields[0].properties.name, priority : intent._fields[0].properties.priority, value : "", videoLink : [], blogLink : []});
        }
      })
    })
    this.editContextService.getAllContext().subscribe((ref) => {
      ref.map((context)=> {
        if(context._fields[0].labels[0] == 'Entity' || context._fields[0].labels[0] == 'Domain' || context._fields[0].labels[0] == 'SubDomain'){
          this.contexts.push({name : context._fields[0].properties.name, label : context._fields[0].labels[0]});
        }
      })
    })
    this.dropdownSettings = { 
      singleSelection: true, 
      text:"Select Intent",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };       


    this.dropdownSettingsContext = { 
      singleSelection: true, 
      text:"Select Context",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };            
  }
  
  getContext(){
    this.editContextService.getContext()
    .subscribe((res)=>{
      res.map((data)=>{
        data._fields.map((name)=>{
          if(name.labels[0] != 'Video' && name.labels[0] != 'Link' && name.labels[0] != 'Counter' && name.properties.name != "type"){
            this.contextName.push(name);
            this.contextDropDown.push({id:this.contextDropDown.length+1,label:name.labels[0],itemName:name.properties.name});
          }
        })
      })
      this.res=res;
    })
  }

  deleteContext(context){
    console.log(context)
        this.editContextService.deleteContext(context)
        .subscribe((res)=>{
          this.contextDropDown=[];
          this.contextval="";
          this.selectedItemsContext=[];
          this.getContext(); 
          this.ref=res;
          swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
            )
        })
        // })  
      }
     

      onEditItemSelect(item:any){
        console.log("In context edit option " , item);
        this.getContextInfo(item);
        this.selectedIntent.push(item);
        //this.intentData.splice(this.intentData.indexOf(item),1);
        //this.intents.splice(this.intents.indexOf(item),1);
      }

  onItemSelectContext(item:any){   
    this.contextval=item;
    this.getContextLabel=item.label;
    this.getContextName=item.itemName;
    console.log("!!!!!!!!!!!!!!!!1",this.contextval);
    // console.log("in selet",this.selectedIntent[0].itemName);
  }

 
 getContextSynonym(){
   this.contextSyn = [];
   this.editContextService.getContextSynonym(this.contextval)
   .subscribe((res)=>{
     console.log(res);
     res.map((data)=>{
       data._fields.map((syn)=>{
         if(syn.labels[0]=='Synonym'){
           // console.log(syn)
           this.contextSyn.push(syn);
           console.log("-0-=0=-0=-s0fd=-ds0f=-sd0f=-0ds " , this.contextSyn );
         }
       })
     })
   })  
 }

 getContextInfo(item){
   this.video=[];
   this.link=[];
   let flag = 1;
   this.getInfo = [];
   this.editContextService.getContextInfo(this.contextval , item)
   .subscribe((res)=>{
     res.answerLinks.map((links)=>{
       links._fields.map((answer)=>{
        
         if(answer.labels[0]=="Link")
         {
           let blog = {
             id : answer.identity.low,
             name : "Link",
             value : answer.properties.value
           }
           this.link.push(blog)
           blog = undefined;
           
         }

          if(answer.labels[0]=="Video")
         {
           let videolink = {
             id : answer.identity.low,
             name : "Video",
             value : answer.properties.value
           }
           this.video.push(videolink)
           videolink = undefined;
           
         }
       })
       
     })
     let intent = {
     name : res.intentData.name,
     value : res.intentData.value,
     videoLink : Object.assign([],this.video),
     blogLink : Object.assign([],this.link)
     }
     this.intentData.push(intent);
      console.log("bloggg======",this.intentData);
      intent = undefined;
   })
 }


updateContext(){
  console.log('updated value..=-=--=--',this.intentData);
}

 addMoreSynonym(syn){
   //console.log(this.contextval)
   this.editContextService.addMoreSynonym(syn,this.contextval)
   .subscribe((res)=>{
     //console.log('ooooooooooooooo.........',res);
   })
 }

 deleteSynonym(synonym){
   console.log(synonym)
   this.editContextService.deleteSynonym(synonym,this.contextval)
   .subscribe((res)=>{
     console.log(res);
   })
 }

 removeVideo(j,i){
   this.intentData[i].videoLink.splice(j,1);
   console.log("remove data", this.intentData[i]);
   //console.log('data', this.addvideolink);
 }

 inputs = [{link : ""}];
 addInput()  {
   this.inputs.push({link: ''});
   console.log('video', this.inputs);
 }

 blog = [{link : ""}];
 addBlog()  {
   this.blog.push({link: ''});
   console.log('video', this.blog);
 }

 removeBlog(k,i){
  this.intentData[i].blogLink.splice(k,1);
   console.log("remove data", this.intentData[i]);
 }

 addmoreVideoLinks(index){
   this.intentData[index].videoLink.push({value : ""});
   console.log("added video", this.intentData[index]);
 }

 addmoreBlogLinks(index){
    this.intentData[index].blogLink.push({value : ""});
   console.log("added video", this.intentData[index]);
 }

}