import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ManagementComponentComponent } from './management-component/management-component.component';
import { UserManagementComponentComponent } from './user-management-component/user-management-component.component';
import { ProductComponentComponent } from './product-component/product-component.component';
import { ExitComponentComponent } from './exit-component/exit-component.component';
import { from } from 'rxjs';
import { LoginGuard } from './login.guard';
import { AuthService } from './auth.service';

const mgtChildrenRoutes: Routes = [ 
  { path: 'user', component: UserManagementComponentComponent }, 
  { path: 'product', component: ProductComponentComponent }, 
  { path: 'exit', component: ExitComponentComponent }, 
  { path: '', redirectTo: 'user', pathMatch: 'full' } 
];

const routes: Routes = [
  { path: 'home', component: HomeComponentComponent }, 
  { path: '', redirectTo: 'home', pathMatch:'full'}, 
  { path: 'login', component: LoginComponentComponent }, 
  { path: 'management', 
  component: ManagementComponentComponent, 
  children: mgtChildrenRoutes,
  canActivate: [LoginGuard]
  
 }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    LoginComponentComponent,
    ManagementComponentComponent,
    UserManagementComponentComponent,
    ProductComponentComponent,
    ExitComponentComponent,
     
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
