import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { DashboardUserComponent } from '../../../src/app/User/dashboard-user/dashboard-user.component';
import { BrowserDynamicTestingModule,
	platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

	describe('TrainDomain Component', () => {

		/*============================Positive Testing for Login==================================*/

		it('TrainDomain  Component should pass' , () =>{
			browser.get("http://localhost:49152//#/admin/traindomain/aish/new");
			element(by.id('btn2')).click();
			element(by.id('intro')).isPresent().then((present)=>{
				if(present){

					element(by.id('sub1')).click();}
				})

		})
	})
