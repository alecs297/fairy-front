import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { AuthService } from './services/auth.service';
import { InterceptorService } from './services/interceptor.service';
import { PublicSplitComponent } from './components/split/split.component';
import { DebtComponent } from './components/split/debt/debt.component';
import { NgChartsModule } from 'ng2-charts';
import { PublicTransactionComponent } from './components/split/transaction/transaction.component';

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
    TransactionComponent,
    PublicSplitComponent,
    PublicTransactionComponent,
    DebtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
