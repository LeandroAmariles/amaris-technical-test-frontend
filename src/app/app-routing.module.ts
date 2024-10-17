import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },  
  { path: 'welcome', component: WelcomeComponent },         
  { path: 'search', component: EmployeeSearchComponent }    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
