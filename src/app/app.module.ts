import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { DetailsComponent } from './details/details.component';
import { DriverComponent } from './driver/driver.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from './services/interceptor/interceptor';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { VehicleListAdminComponent } from './vehicle-list-admin/vehicle-list-admin.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { TouritPlaceComponent } from './tourit-place/tourit-place.component';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsModule } from '@angular/google-maps';
import { AuthGuardService } from './services/authGurad';
import { ViewMyBookingComponent } from './view-my-booking/view-my-booking.component';
import { ProfileComponent } from './profile/profile.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalComponent } from './modal/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    VehicleListComponent,
    DetailsComponent,
    DriverComponent,
    AdminHomeComponent,
    VehicleListAdminComponent,
    VehicleDetailsComponent,
    TouritPlaceComponent,
    PlaceDetailsComponent,
    DriverListComponent,
    PaymentComponent,
    SuccessComponent,
    ViewMyBookingComponent,
    ProfileComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot(), 
    GoogleMapsModule,
    NgSelectModule
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
