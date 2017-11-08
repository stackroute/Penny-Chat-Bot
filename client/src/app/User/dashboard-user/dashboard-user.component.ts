import { Component, OnInit } from '@angular/core';
// import { routerTransition } from '../../router.animations';
import {Output, EventEmitter} from '@angular/core';
import {DashboardUserService} from '../dashboard-user/dashboard-user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss'],
  // animations: [routerTransition()],
  providers:[DashboardUserService]
})

export class DashboardUserComponent implements OnInit {
  @Output() childEvent=new EventEmitter();
  definition:string;
  product :any=[];
  data:any;
  maindata:any = [];
  constructor(private DashboardUserService:DashboardUserService, private router:Router) {}
  /*------------on page initialization ---------------*/
  ngOnInit() {
    // this.getproduct();
  }

  /* ------------get products-----------*/
  // getproduct() {                                     
  //   this.DashboardUserService.getHoverData()
  //   .subscribe((para) => {
  //     this.data = para;
  //     this.data = this.data.sort((a,b) => {
  //       return b.count - a.count;
  //     })
  //     this.create(this.data);
  //   },(dataError)=>{ 
  //    /*------------error handle----------*/                          
  //     localStorage.removeItem('Userdata');
  //     this.router.navigateByUrl('/error');   
  //   })
  // }

  /*----------create method to create new policy array ----------*/
  create(data) {                                                      
    let num = 0;
    for(let i=0;i<data.length;i++) {
      for(let j=0;j<data[i].policy.length;j++) {
        data[i].policy[j].productId = data[i].productId;
        this.maindata.push(data[i].policy[j]);
      }
    }
  }

  // /*---------------navigate to view the product details ------------*/
  // viewDetail(index:any){                                                     
  //   this.router.navigate(['/user/userproductdetail',index])
  // }

  // /*--------------navigate to details with id------------*/
  // detail(id){                                                               
  //   this.router.navigate(['/user/detail/',{'id':id}]);
  // }
}