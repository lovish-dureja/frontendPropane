import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { HttpConfigInterceptor } from './services/http-interceptor';



// services
import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';
import { CommonHttpService } from './services/common-http.service';
import { CommonService } from './services/common.service';
import { ApiUrls } from './config/app-urls';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule   ,
    ReactiveFormsModule   
  ],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [
    UserService,
    ApiService,
    CommonHttpService,
    CommonService,
    ApiUrls,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
