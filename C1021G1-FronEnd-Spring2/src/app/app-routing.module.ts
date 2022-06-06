import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BodyComponent} from "./layout/body/body.component";
import {NewModule} from "./new/new.module";


const routes: Routes = [
  // {path: 'new', loadChildren: () => import ('./new/new.module').then(module => module.NewModule)},
  {path:'home',component:BodyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),NewModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
