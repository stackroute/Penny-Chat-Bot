import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { ResetPasswordComponent } from '../../../src/app/User/reset-password/reset-password.component';
//import {userConfig} from './user.config';
describe('ResetPasswordComponent', () => {
//============== Positive resetpassword============================================ 
  it('user resetpassword pass',()=>{
    browser.get("http://localhost:49152/#/user/resetpassword");
     element(by.id('oldpass')).sendKeys('P@ssw0');
      element(by.name('password')).sendKeys('P@ssw0rd');
      element(by.id('confpass')).sendKeys('P@ssw0rd');
     expect(element(by.name('sub')).getText()).toMatch("Save Changes");
})
  //============== Positive resetpassword============================================ 
  it('negative resetpassword pass',()=>{
    browser.get("http://localhost:49152/#/user/resetpassword");
     element(by.id('oldpass')).sendKeys('P@ssw0');
      element(by.name('password')).sendKeys('P@ssw0rd');
      element(by.id('confpass')).sendKeys('P@ssw0rd');
      expect(element(by.name('sub')).getText()).not.toBeNull();
     //expect(element(by.id('loginbtn')).getText()).toEqual("Login");
})
});
