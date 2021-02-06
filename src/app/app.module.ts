import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { ToolsListComponent } from './components/tools-list/tools-list.component';
import { ToolComponent } from './components/tool/tool.component';
import { AddToolComponent } from './components/add-tool/add-tool.component';
import { NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { EditToolComponent } from './components/edit-tool/edit-tool.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import {NgxCaptchaModule} from 'ngx-captcha';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ToolsListComponent,
    ToolComponent,
    AddToolComponent,
    EditToolComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxCaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
