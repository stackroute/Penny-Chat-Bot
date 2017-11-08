import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { LoginComponent } from '../../src/app/login/login.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {testConfig} from './config';
  describe('LoginComponent', () => {


    /*============================Negative Testing for Login==================================*/
    it('Login Not pass',()=>{
      browser.get("/");
      /*expect(element(by.css('.btn-block')).getText()).not.toBe("acebook");*/
    })

    /*============================Positive Testing for Login==================================*/

    it('Login should pass' , () =>{
      browser.get(testConfig.login);
      element(by.name('email')).sendKeys(testConfig.email);

      element(by.name('password')).sendKeys(testConfig.password);
     /* expect(element(by.id('login-button')).getText()).toEqual(testConfig.loginmsg);
      expect(element(by.css('.btn-block')).getText()).toEqual(testConfig.facebook);
      expect(element(by.id('google')).getText()).toEqual(testConfig.google);
      expect(element(by.id('links')).getText()).toEqual(testConfig.forgotmsg);*/
      element(by.id('login-button')).click();
    })


  });
