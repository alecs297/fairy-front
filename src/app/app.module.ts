import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { SettingsComponent } from './components/account/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SplitComponent } from './components/dashboard/split/split.component';
import { HomeComponent } from './components/home/home.component';
import { TransactionComponent } from './components/dashboard/split/transaction/transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    ProfileComponent,
    SettingsComponent,
    DashboardComponent,
    SplitComponent,
    HomeComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
