import { RouterTestingModule } from '@angular/router/testing';
import { protractor,browser,element,by } from 'protractor';
//import {testConfig} from './util.config';

/*
   ===================================ForgotPassword Testing===============================

   */
   describe('ForgotpasswordService', () => {

   	it('forgot password',()=>{
   		browser.get("http://localhost:49152/#/forgotpassword");

   		element(by.id('email')).sendKeys('aishveengujral@gmail.com');
         element(by.id('forgot-btn')).click();
   		
   	})


   	/*======================Error Testing for ForgotPassword=============================*/
   	it('forgot error testing',()=>{
   		browser.get("http://localhost:49152/#/forgotpassword");
         element(by.id('email')).sendKeys('aishveengujral@gmail.com');
         expect(element(by.id('email')).getText()).not.toBeNull();
   		//element(by.id('email')).sendKeys(testConfig.email);
   
   		

   		
   	})
   });