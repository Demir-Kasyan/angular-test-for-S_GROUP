import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from './material.design';

import { Router } from './routs/_router/_router.component';
import { LoginRoute } from './routs/login/login.component';
import { HomeRoute } from './routs/home/home.component';
import { TableApiComponent } from './components/table/table.component';
import { EditComponent } from './components/edit/edit.component';

const appRoutes: Routes =
[
  { path: '', component: LoginRoute},
  { path: 'home', component: HomeRoute},
  { path: '**', redirectTo: 'home'}
];
 
@NgModule({
    declarations: [Router, LoginRoute, HomeRoute, TableApiComponent, EditComponent],
  imports: [ BrowserModule, RouterModule, RouterModule.forRoot(appRoutes), HttpClientModule,ReactiveFormsModule,
             RouterModule, CommonModule, ChartsModule, FormsModule, Ng2GoogleChartsModule,
             BrowserAnimationsModule, ToastrModule.forRoot(), MaterialModule

  ],
  bootstrap: [Router]
})
export class AppModule {}