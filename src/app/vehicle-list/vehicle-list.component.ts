import { Component } from '@angular/core';
import { AuthenticationService } from '../services/commonService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent {
  list:any = []
  selectedDetails: any = {};
  data: any = localStorage.getItem("searchData");

  constructor(private router: Router, private commonService: AuthenticationService) {
    this.data = localStorage.getItem("searchData");
    this.data = JSON.parse(this.data);
    this.getVehicleDetails();
  }
  showData = false;
  getVehicleDetails() {
    console.log(this.data);
    this.data.startDate = this.getCurrentDate(new Date(this.data.startDate));
    this.data.endDate = this.getCurrentDate(new Date(this.data.endDate));
    this.commonService.findVehicle(this.data.startDate, this.data.endDate, this.data.type).subscribe((data: any) => {
      this.list = data;
      this.showData = true;
      this.list.forEach((data: any) => {
        data.amount = data.amount * this.data.days;
        data.image ="data:" + data.filetype + ";base64," + data.image.toString();
      })
    }, error => {

      this.showData = true;
    })
  }

  selectVehicle(data: any) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Set to false to use 24-hour format
    };
    this.selectedDetails.vehicleid = data.id;
    this.selectedDetails.amount = data.amount;
    this.selectedDetails.startdate = this.data.startDate;
    this.selectedDetails.enddate = this.data.endDate;
    this.selectedDetails.origin = this.data.origin;
    this.selectedDetails.destination = this.data.destination;
    this.selectedDetails.bookingdate = this.getCurrentDate(new Date());
    this.selectedDetails.vehicleData = data;
    this.commonService.addbookingDetails(this.selectedDetails);
    this.router.navigate(["/vehicle-details"]);
  }

  getCurrentDate(date:any): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
}
