import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FooterComponent} from './layout/footer/footer.component';
import {BodyComponent} from './layout/body/body.component';
import {HeaderComponent} from './layout/header/header.component';
import {SignInComponent} from './login/sign-in/sign-in.component';
import {SignUpComponent} from './login/sign-up/sign-up.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {HighchartsChartModule} from "highcharts-angular";
import {CommonModule} from '@angular/common';
import {CarManagementModule} from './car-management/car-management.module';
import {LocationModule} from './location/location.module';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MapParkingModule} from './map-parking/map-parking.module';
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatBadgeModule} from "@angular/material/badge";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {CdkTableModule} from "@angular/cdk/table";
import {TicketModule} from "./ticket/ticket.module";
import {RouterModule, Routes } from '@angular/router';
import {StatisticComponent} from './statistic/statistic/statistic.component'
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BodyComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    SidebarComponent,
    StatisticComponent
    ]
,
  imports: [
    HighchartsChartModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSnackBarModule,
    NgxPaginationModule,
    MatDialogModule,
    CdkTableModule,
    CommonModule,
    CarManagementModule,
    LocationModule,
    MapParkingModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
