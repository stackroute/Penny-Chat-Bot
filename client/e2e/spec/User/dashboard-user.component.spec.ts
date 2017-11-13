import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { DashboardUserComponent } from '../../../src/app/User/dashboard-user/dashboard-user.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

  describe('Dashboarduser Component', () => {

    /*============================Positive Testing for Login==================================*/

    it('Dashboarduser Component should pass' , () =>{
      browser.get("http://localhost:49152/#/user/dashboardUser");
      element(by.css('.card-body')).click();
    })

  });
