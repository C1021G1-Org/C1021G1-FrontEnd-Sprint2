import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateNewsComponent} from "./create-news/create-news.component";
<<<<<<< HEAD
import {UpdateNewsComponent} from './update-news/update-news.component';
import {BodyComponent} from '../layout/body/body.component';





const routes: Routes = [

  {path : "listNews", component: BodyComponent},
=======
import {UpdateNewsComponent} from "./update-news/update-news.component";
import {NewsDetailComponent} from "./news-detail/news-detail.component";


const routes: Routes = [
  {path : "listNews", component: ListNewsComponent},
>>>>>>> f0c0580e33c4603722ee19c81bb224884382d469
  {path : "createNews", component: CreateNewsComponent},
  {path : "newsDetail/:id", component: NewsDetailComponent},
  {path : "updateNews/:id", component: UpdateNewsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRoutingModule { }
