import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { LoginComponent } from '../../src/app/login/login.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

  describe('RegisterComponent', () => {

    /*============================Positive Testing for Login==================================*/

    it('Register should pass' , () =>{
      browser.get("http://localhost:49152/#/register");
      element(by.name('name')).sendKeys('aishveen kaur');
      element(by.name('email')).sendKeys('aishveengujral@gmail.com');
      expect(element(by.name('password')).sendKeys('P@ssw0rd'))
     .toEqual(element(by.name('confirmPassword')).sendKeys('P@ssw0rd'));
      //expect(element(by.id('login-button')).getText()).toEqual(testConfig.login);
      element(by.id('login-button')).click();  
    })

      /*============================Negative Testing for Login==================================*/
  it('register pass error test',function(){
     browser.get("http://localhost:49152/#/register");
     element(by.name('name')).sendKeys('aishveen kaur');
      element(by.name('email')).sendKeys('aishveengujral@gmail.com');
      expect(element(by.name('password')).sendKeys('P@ssw0rd'))
     .toEqual(element(by.name('confirmPassword')).sendKeys('P@ssw0rd'));
    expect(element(by.name('password')).getText()).not.toBeNull();
})
    

  });

