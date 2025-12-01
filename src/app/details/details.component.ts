import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/commonService.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  loginData: any;
  isLogin: boolean = false;
  bookingDetails: any = {};
  vehicleData: any = {};
  list: any = [];
  constructor(private router: Router, private commonService: AuthenticationService) { }
  ngOnInit() {
    this.loginData = localStorage.getItem("loginData");
    this.loginData = JSON.parse(this.loginData);
    this.commonService.getBookingDetails().subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.bookingDetails = data;
        localStorage.setItem("data", JSON.stringify(data));
        console.log(localStorage.getItem("data"))
      }
      else {
        this.bookingDetails = JSON.parse(localStorage.getItem("data") || "");
        console.log(this.bookingDetails)
      }
      this.vehicleDetails();
      this.getPlaceDetails();
      this.getDriver();
    });
  }
  vehicleId: any;
  getDriver() {
    this.commonService.getDrivers().subscribe((data:any) => {
      if (data)
        this.vehicleId = data[0].id;
    });
  }
  getPlaceDetails() {
    this.commonService.getPlacesUnderDistrict(this.bookingDetails.destination).subscribe((data) => {
      console.log(data);
      this.list = data;
      this.list.forEach((data:any) => {
        if (data.image)
          data.image = "data:" + data.filetype + ";base64," + data.image.toString();
      })
    })
  }
  vehicleDetails() {
    let id = this.bookingDetails.vehicleid;
    this.commonService.getVehicleDetails(id).subscribe((data:any) => {
      this.vehicleData = data;
    })
  }
  bookNow() {
    console.log(this.bookingDetails);
    if (this.loginData) {
      this.commonService.createBooking(this.bookingDetails.vehicleid, this.bookingDetails.startdate,
        this.bookingDetails.enddate, this.bookingDetails.bookingdate, "Pending",
        "Pending", this.bookingDetails.origin, this.bookingDetails.destination, this.loginData.id, this.vehicleId,
        this.bookingDetails.amount, false).subscribe((data: any) => {
          console.log(data)
          this.router.navigate(["/payment/", data])
        }, error => {
          this.commonService.showMessage("Something went wrong", "error");
        })
    } else {

      this.router.navigate(["/login/"])
    }
  }

}
