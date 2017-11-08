import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {config} from '../../config/app.config';

/*======================Service Class=================================*/
@Injectable()
export class TraindomainService {

  constructor(private http:Http) { }



 url:string=config.ip+"/train_intent/traindomain"
 url1:string=config.ip+"/train_intent/getIntent"
 url2:string=config.ip+"/train_intent/updateIntent"
/*================================Add Intent& Sentence====================*/
  addSentence(object): Observable<any> {
  	return this.http
  	.post(this.url, {object:object})
  	.map((res: Response)=>{
      console.log('service.. ',res);
  		 return res.json()
    }
  	)
  }


/*============================Change Intent & Service======================*/


changeIntent(object): Observable<any> {
  	return this.http
  	.put(this.url1,{object:object})
  	.map((res: Response)=>
  		 res.json()
  	)
  }

/*===========================Fetch Data in Service========================*/


fetch(object): Observable<any> {
  console.log('hii', object)
  	return this.http
  	.get(this.url2,object)
  	.map((res: Response)=>
  		 res.json()
  	)
  }
/*============================Save at Mongo ==============================*/
save(object):Observable<any> {
  return this.http.post(config.ip+"/followup",object)
  .map((res:Response) => res.json());
}

/* ==============================Get Data with prefilled value ======================*/

getdata(name):Observable<any> {
  return this.http.get(config.ip+"/followup/getdata/"+name)
  .map((res:Response) =>res.json());
}
}
