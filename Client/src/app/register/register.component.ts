import { Component, OnInit } from '@angular/core';
import { Config } from './register_en_config';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import swal  from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[RegisterService]
})
export class RegisterComponent implements OnInit {
Config:any=Config;
data:any={};
registerdata:any;
submitted=false;
  constructor(private registerService:RegisterService,private router:Router ){}


  ngOnInit() {
  }

onSubmit() { 
     this.submitted = true; }

      move(data:any) {
        console.log('data',data);
        console.log('dataa',data.message);
        if(data.message!==Config.signup.alreadyExists){
          //validations if email already exists 
          if(data.status == true) {
            console.log(data.status)
            
            swal(Config.signup.swalOnsubSucMsg1,Config.signup.swalOnsubSucMsg2,'success');
            this.router.navigateByUrl('');
            //navigate to login Page after successful registration
          }
        }  
        else{
          //if email alreafy exists
          swal(

            Config.signup.swalOnsubErrMsg1,
            Config.signup.swalOnsubErrMsg2,
            'error'
            )
          console.log('already exist');
        }
      }


      //----------------------postUser function suscribing service----------------------------- 
      postUser(){
      if(this.data.password!==this.data.confirmPassword){
         console.log('pass');
          swal(

            Config.signup.swalPostErrMsg1,
            Config.signup.swalPostErrMsg2,
            'error'
            )
        }
        else {
          this.registerService.post(this.data)
          .subscribe((data) => {
            this.registerdata=data;
            this.move(data)}
            )
        }}
      }