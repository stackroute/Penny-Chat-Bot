import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {config} from '../../config/app.config';
import { urlConfig } from '../../config/url.config';

/*======================Service Class=================================*/
@Injectable()
export class CreateFlowService {

	constructor(private http:Http) { }

	url2:string=config.ip+urlConfig.AdminCreateFlowfetch;

	fetch(): Observable<any> {
		return this.http
		.get(this.url2)
		.map((res: Response)=> res.json())
	}
/*============================Save at Mongo ==============================*/

}
