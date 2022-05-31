import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailLocationComponent} from './detail-location/detail-location.component';
import {DeleteLocationComponent} from './delete-location/delete-location.component';
import {ListLocationComponent} from './list-location/list-location.component';


const routes: Routes = [
  //tinhhd
  {
    path: 'location-list',
    component: ListLocationComponent
  },
  //trong ta
    {
      path: 'location-detail/:id',
      component: DetailLocationComponent
    },
  //trongta
    {
      path: 'location-delete/:id',
      component: DeleteLocationComponent
    }]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {
}
