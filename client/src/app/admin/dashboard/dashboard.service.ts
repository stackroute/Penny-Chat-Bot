import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable' ;
import {config} from '../../config/app.config';
@Injectable()
export class DashboardService {

  constructor(private http:Http) { }


 url:string=config.ip+"/train_intent/traindomain"
 url1:string=config.ip+"/train_intent/getIntent"
 url2:string=config.ip+"/train_intent/updateIntent"
 trainurl:string=config.ip+"/train_intent";
 suggesturl:string=config.ip+"/suggest";

getunanswer():Observable<any>{
	let url:any = config.ip+"/unques";
	

		let userData = JSON.parse(localStorage.getItem('Userdata')).data;
    return this.http.get(url)
    .map((res:Response) =>{
   	//console.log("in response ",res);
			return res.json();
		})
}


	getQues(ques):Observable<any>{
		let Quesurl:any = config.ip+"/questoken";
		return this.http.post(Quesurl,{ques}).map((res)=>{
			console.log('service.. ',res);
			return res.json();
		})
	}

	getIntent(){
		let url:any = config.ip+"/train_intent";
		 return this.http.get(url)
    .map((res:Response) =>{
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



/*================================Add Intent& Sentence====================*/
  addSentence(object): Observable<any> {
  	return this.http
  	.post(this.url, {object:object})
  	.map((res: Response)=>{
     // console.log('service.. ',res);
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
 // console.log('hii', object)
  	return this.http
  	.get(this.url2,object)
  	.map((res: Response)=>
  		 res.json()
  	)
  }


  /*======================set synonym==========================*/

setSynonym(intent,word): Observable<any> {
//console.log('service',intent,word)
let synUrl=config.ip+"/train_intent/setSynonym"

return this.http
  	.post(synUrl,{intent:intent,word:word})
  	.map((res: Response)=>
  		 res.json()
  	)
}
contextSynonym(context,word): Observable<any> {
console.log('service',context)
let synUrl=config.ip+"/train_intent/contextsynonym";

return this.http
    .post(synUrl,{context:context,word:word})
    .map((res: Response)=>{
      console.log('service context.. ', res)
      res.json()
    }
       
    )
}

sendques(question){
  let synUrl=config.ip+"/unques"

return this.http
    .post(synUrl,{question:question})
    .map((res: Response)=>
       res.json()
    )
}

/*==========================Start of Adds New Intent==============================*/
addIntent(intent):Observable<any> {
    return this.http.post(this.trainurl,{name:intent})
    .map((res:Response)=>{
      return res.json();
    })
  }

/*==========================Start of Add Intent's Synonym==============================*/
addSynonym(data): Observable<any> {
  console.log("Servi!!!!!!!!!!!!!!!11",data)
    return this.http
    .put(this.trainurl,{data: data})
    .map((res: Response)=>{
      console.log(res.json())
      return res.json()
    })
  }

/*==========================Start of Suggest Synonym==============================*/
  suggest(data): Observable<any> {
    return this.http
    .put(this.suggesturl,{data: data})
    .map((res: Response)=>{
      return res.json().data
    })
  }

}