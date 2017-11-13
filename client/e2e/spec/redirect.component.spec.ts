import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { browser,element,by } from 'protractor';
import { RedirectComponent } from '../../src/app/redirect/redirect.component';
//import {testConfig} from './util.config';
describe('RedirectComponent', () => {
	/*============================Negative Testing for Login==================================*/
	it('RedirectComponent negative', ()=> {
		browser.get("http://localhost:49152/#/redirect/59c22b2df1abf31b5b85ae40");
		element(by.css('.card-block')).isPresent().then((present)=>{
			if(present){
				expect(element(by.css('.card-title')).getText()).not.toBeNull();
			}

		})
	});
	/*============================Positive Testing for Login==================================*/

	it('RedirectComponent positive', ()=> {
		browser.get("http://localhost:49152/#/redirect/59c22b2df1abf31b5b85ae40");
		element(by.css('.card-block')).isPresent().then((present)=>{
			if(present){
				expect(element(by.css('.card-title')).getText()).toMatch("Warning !");
			}
			
		})
	});


});

