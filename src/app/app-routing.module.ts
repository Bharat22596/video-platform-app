import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'sign-up', component: UserSignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: UserLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
