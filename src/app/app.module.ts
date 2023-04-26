import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CookieModule, CookieService } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MainComponent } from './main/main.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { TileComponent } from './tile/tile.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    LogoutComponent,
    ListComponent,
    TileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    CookieModule.forRoot(),
    AppRoutingModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
