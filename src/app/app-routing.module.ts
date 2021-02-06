import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ToolsListComponent} from './components/tools-list/tools-list.component';
import {ToolComponent} from './components/tool/tool.component';
import {AddToolComponent} from './components/add-tool/add-tool.component';
import {EditToolComponent} from './components/edit-tool/edit-tool.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'tools', component: ToolsListComponent},
  { path: '', redirectTo:'tools', pathMatch: 'full'},
  { path: 'tool/:id', component: ToolComponent},
  { path: 'addTool', component: AddToolComponent},
  { path: 'editTool/:id', component: EditToolComponent},
  { path: 'adminPanel', component: AdminPanelComponent},
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
