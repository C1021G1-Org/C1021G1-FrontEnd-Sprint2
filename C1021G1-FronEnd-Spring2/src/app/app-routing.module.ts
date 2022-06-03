import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './layout/body/body.component';


const routes: Routes = [
  {path: '',component: BodyComponent},
  {path: 'employee', loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
