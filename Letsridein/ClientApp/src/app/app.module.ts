import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { DemoMaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MatTableModule, MatToolbarModule, MatMenuModule, MatButtonModule, MatCardModule } from '@angular/material';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewTripComponent } from './new-trip/new-trip.component';
import { TripsComponent } from './trips/trips.component';
import { RatingComponent } from './rating/rating.component';
import { ProfileComponent } from './profile/profile.component';
import { InternationalizationService } from './services/internationalization.service';
import { TripsService } from './services/trips.service';
import { UserService } from './services/user.service';
import { FilteringComponent } from '../app/filtering/filtering.component';
import { CompleteProfileComponent } from '../app/complete-profile/complete-profile.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { TripDetailsComponent } from '../app/trip-details/trip-details.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
 
} from "angular-6-social-login";
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationService } from './services/notification.service';
import { PaginationComponent } from './trips/pagination.component';
import { RatingService } from './services/rating.service';
import { TripRequestService } from './services/trip-request.service';
import { RideModalComponent } from './ride-modal/ride-modal.component';
import { AdminService } from './services/admin.service';
import { ReportComponent } from './report/report.component';
import { TripOwnerDetailsComponent } from './trip-owner-details/trip-owner-details.component';
import { TripRequesterDetailsComponent } from './trip-requester-details/trip-requester-details.component';
import { AdsDialogComponent } from './ads-dialog/ads-dialog.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [

      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("220033811216-ajopo4sntq32875hism060hqejog81po.apps.googleusercontent.com")
      }
    ]
  );

  return config;
}



// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient ,'/assets/i18n/', '.json?cb=' + new Date().getTime());
}
export function tokenGetter() {
  return localStorage.getItem('jwt');
}
@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    NewTripComponent,
    TripsComponent,
    ProfileComponent,
    RatingComponent,
    PaginationComponent,
    FilteringComponent,
    CompleteProfileComponent,
    TripDetailsComponent,
    RideModalComponent,
    ReportComponent,
    TripOwnerDetailsComponent,
    TripRequesterDetailsComponent,
    AdsDialogComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    GooglePlaceModule,
    AmazingTimePickerModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    DeviceDetectorModule.forRoot(),
    MatToolbarModule, MatMenuModule, MatTableModule, MatButtonModule, MatCardModule,
    SocialLoginModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    ReactiveFormsModule,
    DemoMaterialModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: TripsComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'new-trip', component: NewTripComponent },
      { path: 'trips', component: TripsComponent },
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'rating', component: RatingComponent },
      { path: 'filtering', component: FilteringComponent },
      { path: 'complete-profile', component: CompleteProfileComponent },
      { path: 'trip-details/:id', component: TripDetailsComponent },
      { path: 'ride', component: RideModalComponent },
      { path: 'report', component: ReportComponent },
      { path: 'ads', component: AdsDialogComponent },
       { path: 'resetPassword', component: ResetPasswordComponent }

    ])
  ],
  providers: [
    InternationalizationService,
    TripsService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    NotificationService,
    AuthService,
    RatingService,
    UserService,
    TripRequestService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
