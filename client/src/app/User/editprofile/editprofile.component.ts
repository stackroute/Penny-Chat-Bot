import { Component, OnInit } from '@angular/core';
import { Config } from './../../config/multi_en_config';
import { EditprofileService } from './editprofile.service';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import swal  from 'sweetalert2';


@Component({
	selector: 'app-editprofile',
	templateUrl: './editprofile.component.html',
	styleUrls: ['./editprofile.component.scss'],
	animations: [routerTransition()],
	providers : [ EditprofileService ]
})
export class EditprofileComponent implements OnInit {
	Config:any=Config;
	userData : any;
	cnfmPassword : string;
	ref : any;
	constructor(private editprofileService : EditprofileService, private router : Router) { }
	
	/*on page initialization*/
	ngOnInit() {
		this.userData = JSON.parse(localStorage.getItem('Userdata'));  //getting userdata from localstorage
        console.log('hello', this.userData)
		this.userData = this.userData;
		console.log('hello2', this.userData)
	}

	gotoDashboard() {

		this.router.navigateByUrl('/user/chat'); // render to user dashboard
	}
   
 gotoResetPassword() {
		this.router.navigateByUrl('/user/resetpassword'); // render to user dashboard
	}

	passwordvalidation() {  // matching password and confirm password 
		if(this.userData.data.password!==this.cnfmPassword){
			swal(
				'Oops...',
				'password mismatch',
				'error'
				)
		}
	}

	submit() {
		if(!this.userData.data.name || !this.userData.data.email ){
			swal("please enter all fields");
		}

		else  {  // send entered data to service
			this.editprofileService.submit(this.userData)
			.subscribe(ref => {
				if(ref.status == false) {  // if server returns any error
					swal(
						'Oops...',
						'Error in Update'
						)
				}
				else {			// if updated successfully
					swal(
						'Success',
						'Updated Successfully'
						)
					this.router.navigateByUrl('/')
				}
			},(dataError)=>{
				localStorage.removeItem('Userdata');
				this.router.navigateByUrl('/error');
			});
		}
		
}
}
