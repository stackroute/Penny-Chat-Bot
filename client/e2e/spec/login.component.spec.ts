import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { LoginComponent } from '../../src/app/login/login.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

  describe('LoginComponent', () => {

    /*============================Positive Testing for Login==================================*/

    it('Login should pass' , () =>{
      browser.get("http://localhost:49152/");
      element(by.name('email')).sendKeys('aishveengujral@gmail.com');
      element(by.name('password')).sendKeys('W@heguru');
     //expect(element(by.id('loginbtn')).getText()).toEqual("Login");
      element(by.id('loginbtn')).click();
    })

  /*============================Negative Testing for Login==================================*/
  it('login pass error test',function(){
     browser.get("http://localhost:49152/");
       element(by.name('email')).sendKeys('aishveengujral@gmail.com');
      element(by.name('password')).sendKeys('W@heguru');
    expect(element(by.name('password')).getText()).not.toBeNull();
})

  });

