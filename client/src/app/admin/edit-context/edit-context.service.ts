import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {config} from '../../config/app.config';


@Injectable()
export class EditContextService {

  constructor(private http:Http) { }

  
  url:string=config.ip+"/addcontext";
  urlIntent:string=config.ip+"/train_intent";
  urlContext:string=config.ip+"/train_intent/getContext";
  createContextUrl : string = config.ip+"/addcontext";
  
  getIntent():Observable<any> {
    return this.http.get(this.urlIntent)
    .map((res:Response)=>{
      return res.json();
    })

  }
  getAllContext():Observable<any> {
    return this.http.get(this.urlContext)
    .map((res:Response)=>{
      console.log('contexts',res.json());
      return res.json();
    })
  }

 

  getContext(){
    //console.log('jkdgfkl')
    let url:any = config.ip+"/train_intent/getContext";
    return this.http.get(url)
    .map((res:Response) =>{
      //console.log("in response ",res);
      return res.json();
    })

  }

  deleteContext(context) : Observable<any> {
    let url:any = config.ip+"/addcontext/deleteContext";
    console.log('service..',context)
    return this.http
    .post(url,{data: context})
    .map((res: Response)=>{
      console.log(res)
      return res.json()
    })
  }

  getContextSynonym(context):Observable<any>{
    let url=config.ip+"/editContext";
    //console.log('ssss..',context)
    return this.http.post(url,context)
    .map((res)=>{
      //console.log('servi////',res.json());
      return res.json();
    })
  }

  getContextInfo(context , item) :Observable<any>{
    console.log("Ek baar phir baja " , context);
    let url=config.ip+"/editContext/getContextInfo";
     return this.http.post(url,{context : context, intent : item})
    .map((res)=>{
      console.log('servi=-===============-=-=-',res.json());
      return res.json();
    })
  }

  addMoreSynonym(syn,context){
  console.log(syn,context);
  let url:any = config.ip+"/editContext/editAddSynonym";
   return this.http
    .post(url,{synonym:syn,context:context})
    .map((res: Response)=>{
      console.log('sersss  ==',res);
      return res.json()
    })
}


deleteSynonym(synonym,context){
let url:any = config.ip+"/editContext/editDeleteSynonym";
return this.http
    .post(url,{synonym:synonym,context:context})
    .map((res: Response)=>{
      console.log(res)
      return res.json()
    })
}

updateContext(contextName, completeContext) {
  let url: any = config.ip+"/editContext/editLink";
  return this.http
          .put(url,{context : contextName, completeContext : completeContext })
          .map((res : Response) => res.json());
}

}