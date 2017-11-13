import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { DashboardComponent } from '../../../src/app/admin/dashboard/dashboard.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

  describe('Dashboarduser Component', () => {

    /*============================Positive Testing for Login==================================*/

    it('Dashboarduser Component should pass' , () =>{
      browser.get("http://localhost:49152/#/admin/dashboardAdmin");
      element(by.css('.card-body')).click();
    })

  });
