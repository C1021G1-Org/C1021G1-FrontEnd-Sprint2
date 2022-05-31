import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailLocationComponent} from './detail-location/detail-location.component';
import {DeleteLocationComponent} from './delete-location/delete-location.component';



const routes: Routes = [


    {path:'locations/detail-location/:id',
    component:DetailLocationComponent},

    {path:'locations/delete-location/:id',
    component:DeleteLocationComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
