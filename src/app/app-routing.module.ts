import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { DetailsComponent } from './details/details.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { VehicleListAdminComponent } from './vehicle-list-admin/vehicle-list-admin.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { TouritPlaceComponent } from './tourit-place/tourit-place.component';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { DriverComponent } from './driver/driver.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { AuthGuardService } from './services/authGurad';
import { ViewMyBookingComponent } from './view-my-booking/view-my-booking.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent,},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'vehicle-list', component: VehicleListComponent },
      { path: 'vehicle-details', component: DetailsComponent },
      { path: 'admin-home', component: AdminHomeComponent  ,canActivate: [AuthGuardService] },
      { path: 'vehicle', component: VehicleListAdminComponent },
      { path: 'vehicle/:id', component: VehicleDetailsComponent },
      { path: 'place', component: TouritPlaceComponent },
      { path: 'place-details/:id', component: PlaceDetailsComponent },
      { path: 'driver', component: DriverListComponent },
      { path: 'driver-details/:id', component: DriverComponent },
      { path: 'payment/:id', component: PaymentComponent },
      { path: 'success', component: SuccessComponent },
      { path: 'my-booking', component: ViewMyBookingComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'bookings', component: ViewMyBookingComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  declarations: [
  ],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
