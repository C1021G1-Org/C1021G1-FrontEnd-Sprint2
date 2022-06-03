import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListNewsComponent} from "./list-news/list-news.component";
import {CreateNewsComponent} from "./create-news/create-news.component";
import {UpdateNewsComponent} from "./update-news/update-news.component";
import {NewsDetailComponent} from "./news-detail/news-detail.component";


const routes: Routes = [
  {path : "listNews", component: ListNewsComponent},
  {path : "createNews", component: CreateNewsComponent},
  {path : "newsDetail/:id", component: NewsDetailComponent},
  {path : "updateNews/:id", component: UpdateNewsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRoutingModule { }
