import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxPaginationModule} from "ngx-pagination";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CdkTableModule} from "@angular/cdk/table";
import {CKEditorModule} from "ckeditor4-angular";
import {NewModule} from "./new/new.module";
import { AbstractControl, ValidationErrors } from '@angular/forms';







const config = {
  apiKey: '<your-key>',
  authDomain: '<your-project-authdomain>',
  databaseURL: '<your-database-URL>',
  projectId: '<your-project-id>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>'
};




@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        DragDropModule,
        BrowserAnimationsModule,
        NgxPaginationModule,
        CdkTableModule,
        CKEditorModule,
        NewModule,
      ReactiveFormsModule,

    ],
  providers: [],
  bootstrap: [AppComponent]

})

export class AppModule { }


export class WhiteSpaceValidator {
  static noWhiteSpace(control: AbstractControl) : ValidationErrors | null {
    if((control.value as string).indexOf(' ') >= 0){
      return {noWhiteSpace: true}
    }
    return null;
  }
}
