import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListNewsComponent} from "./list-news/list-news.component";
import {CreateNewsComponent} from "./create-news/create-news.component";
import {UpdateNewsComponent} from "./update-news/update-news.component";
import {BodyComponent} from "../layout/body/body.component";


const routes: Routes = [
  {path : "listNews", component: BodyComponent},
  {path : "createNews", component: CreateNewsComponent},
  {path : "updateNews/:id", component: UpdateNewsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRoutingModule { }
