import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CarManagementRoutingModule} from './car-management/car-management-routing.module';


const routes: Routes = [

  {
    path: 'car', loadChildren: () => import('./car-management/car-management.module').then(mod => mod.CarManagementModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), CarManagementRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
