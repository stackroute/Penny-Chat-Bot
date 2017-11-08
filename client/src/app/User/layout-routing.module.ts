//importing all the components---------------------
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardUserComponent} from './dashboard-user/dashboard-user.component';
import { ChatComponent } from './chat/chat.component'
//------------redirect paths to components-----------------------
const routes: Routes = [
{
  path: '', component: LayoutComponent,
  children: [
  { path: 'dashboardUser',component: DashboardUserComponent },
  { path: 'chat', component:ChatComponent},
  ]
}
];
//---------------Main module-------------------------
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
