import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { AddNewContextComponent } from './add-new-context/add-new-context.component';
import { AddtaskComponent } from './addtask/addtask.component';
import {BottrainingComponent} from './bottraining/bottraining.component';
import {TraindomainComponent} from './traindomain/traindomain.component';
import { CreateFlowComponent } from './create-flow/create-flow.component';


const routes: Routes = [
	{
		path: '', component: AdminComponent,
		children: [
		{
			path: 'dashboardAdmin', component: DashboardComponent
		}]
	},
	{
     	path : 'traindomain/:name/:op', component : TraindomainComponent
     },
     {
     	path : 'createflow', component : CreateFlowComponent
     },
     {
        path:'trainingbot' ,component:BottrainingComponent
     },
 
	{	path : 'trainingbot/addnewcontext', component : AddNewContextComponent },
	{
		path: 'dashboardAdmin/addtask', component: AddtaskComponent
	},
	];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }


