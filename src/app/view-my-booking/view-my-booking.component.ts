import { Component } from '@angular/core';
import { AuthenticationService } from '../services/commonService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-my-booking',
  templateUrl: './view-my-booking.component.html',
  styleUrl: './view-my-booking.component.css'
})
export class ViewMyBookingComponent {
  header = ["", "Booking Date", "From - To", "Date", "Amount", "Booking Status", "Vehicle","Action"]
  bookings: any = []
  loginData: any;
  constructor(private commonService: AuthenticationService, private router: Router) {
    this.loginData = localStorage.getItem("loginData");
    this.loginData = JSON.parse(this.loginData);
    this.getBooking();
  }
  bookNow(id:any) {
    this.router.navigate(["/payment/", id])
  }
  getBooking() {
    this.commonService.getBooking().subscribe((data: any) => {
      console.log(data);
      this.bookings = data.filter((element: any) => {return parseInt(element.userId) == this.loginData.id
    });

    })
  }
  cancelBooking(user: any) {
    user.status = "cancelled"
    this.commonService.updateBooking(user.id, user).subscribe((data) => {
      this.getBooking();
    })
  }
}
