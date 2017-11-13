import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { CreateFlowComponent } from '../../../src/app/admin/create-flow/create-flow.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

  describe('CreateFlow Component', () => {

    /*============================Positive Testing for Login==================================*/

    it('CreateFlow  Component should pass' , () =>{
      browser.get("http://localhost:49152/#/admin/createflow");
       element(by.id('aflow')).sendKeys('AishKaur');
       element(by.id('flowbtn')).click();
    })

  });
