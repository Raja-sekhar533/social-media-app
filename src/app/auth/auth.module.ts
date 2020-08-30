import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent  } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularMaterialComponent } from '../angular-material.module';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { TodayComponent } from './today/today.component';



@NgModule({
  declarations: [ 
    LoginComponent,
    SignupComponent,
    UserComponent,
    TodayComponent,
    ],
  imports: [
    CommonModule,
    AngularMaterialComponent,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
