import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchCarComponent} from './car-management/search-car/search-car.component';

const routes: Routes = [
  {
    path: 'findCar',
    component: SearchCarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
