import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListLocationComponent} from "./list-location/list-location.component";


const routes: Routes = [
  {
    path: "location-list",component : ListLocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
