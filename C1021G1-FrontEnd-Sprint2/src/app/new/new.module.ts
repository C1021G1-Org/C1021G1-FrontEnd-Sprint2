import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoutingModule } from './new-routing.module';
import { ListNewsComponent } from './list-news/list-news.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { UpdateNewsComponent } from './update-news/update-news.component';
import { DeleteNewsComponent } from './delete-news/delete-news.component';
import {CKEditorModule} from "ckeditor4-angular";
import {ReactiveFormsModule} from "@angular/forms";
import { NewsDetailComponent } from './news-detail/news-detail.component';


@NgModule({
    declarations: [ListNewsComponent, CreateNewsComponent, UpdateNewsComponent, DeleteNewsComponent, NewsDetailComponent],
    exports: [
        CreateNewsComponent
    ],
  imports: [
    CommonModule,
    NewRoutingModule,
    CKEditorModule,
    ReactiveFormsModule
  ]
})
export class NewModule { }
