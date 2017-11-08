import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {config} from '../../config/app.config';

@Injectable()
export class AddNewContextService {
  constructor(private http:Http) { }
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
  submitContext(context:any,completeContext:any,synonym:any, selectedContext:any):Observable<any> {
    let createContext = {
        context : context,
        completeContext : completeContext,
        synonym : synonym,
      selectedContext : selectedContext
    }
    console.log('createContext in service',createContext);
    return this.http.post(this.createContextUrl,createContext)
    .map((res:Response)=>{
        console.log('contexts',res.json());
        return res.json();
    })
  }
}