import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddNewContextService } from './add-new-context.service';
@Component({
  selector: 'app-add-new-context',
  templateUrl: './add-new-context.component.html',
  styleUrls: ['./add-new-context.component.scss'],
  providers : [AddNewContextService]
})
export class AddNewContextComponent implements OnInit {
  completeContext: any =[];
  intents : any = [];
  contexts : any = [];
  data:any;
  context:any;
  synonym:any;
  flag:boolean = true;
  disabled:string = 'Disable';
  indexflag:number = -1;
  disableArray= [];
  disableValue=-1;
  removeIntent: any = [];
  setDomain:any;
  selectedContext : any = {name : "Add to", label : ""};
  constructor(private routeparams:ActivatedRoute,private router:Router, private addNewContextService : AddNewContextService) { }
  ngOnInit() {
    this.data=this.routeparams.params.subscribe(para=>{ 
      this.context=para;
    });
    this.addNewContextService.getIntent().subscribe((ref) => {
      ref.map((intent)=> {
        if(intent._fields[0].labels[0] == "Intent"){
          this.intents.push({name : intent._fields[0].properties.name, priority : intent._fields[0].properties.priority, value : "", videoLink : "", blogLink : ""});
        }
      })
    })
    this.addNewContextService.getAllContext().subscribe((ref) => {
      ref.map((context)=> {
        if(context._fields[0].labels[0] == 'Entity' || context._fields[0].labels[0] == 'Domain' || context._fields[0].labels[0] == 'SubDomain'){
          this.contexts.push({name : context._fields[0].properties.name, label : context._fields[0].labels[0]});
        }
      })
    })
  }
  printintent(index,intent) {
    // this.disableArray.push(index);
    // this.completeContext.push(intent);
    // console.log('all intents', this.completeContext, this.synonym);
    //console.log('all intentsDescription', this.intentDesc);
  }
  disable(index,intent) {
    if(this.disableArray.indexOf(index)==this.disableValue){
      this.disableArray.push(index);
      intent.disable = true;
      this.disabled = "Enable";
    }
    else
    {
      this.disableArray.splice(this.disableArray.indexOf(index),1);
      intent.disable = false;
      this.disabled = "Disable";
    }
  }
  submitContext() {
    if(this.setDomain != undefined) {
      if((this.setDomain == true && this.selectedContext.name != "Add to") || this.setDomain == false) {
        this.addNewContextService.submitContext(this.context,this.intents,this.synonym,this.selectedContext)
        .subscribe((ref) => {
          console.log('ref', ref);
          if(ref.status == true){
            alert("Context added successfully");
            this.router.navigate(['/admin/trainingbot']);
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
}
