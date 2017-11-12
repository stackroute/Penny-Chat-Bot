import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { AddtaskComponent } from '../../../src/app/admin/addtask/addtask.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

  describe('AddtaskComponent', () => {

    /*============================Positive Testing for Login==================================*/

    it('AddtaskComponent pass' , () =>{
      browser.get("http://localhost:49152/#/admin/dashboardAdmin/addtask");
      element(by.name('answer')).sendKeys('hello');
      element(by.name('nextans')).sendKeys('retirement plan');
      element(by.name('res')).sendKeys('abc');
      element(by.name('negative')).sendKeys('2');
     element(by.name('nextneg')).sendKeys('1');
      element(by.name('negres')).sendKeys('18');
     
     
      element(by.id('sub')).click();
    })


  });

