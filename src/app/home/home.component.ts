import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/commonService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  list = [{
    id: 1,
    name: "Vythiri",
    district: "Wayanad",
    description: "Manu",
    image: "",
    filetype: "",
  }];
  loginData: any;
  vehicleData: any = {
    origin: "",
    destination: "",
    startDate: new Date(),
    endDate: new Date(),
    type: ""
  }
  endTime: any = "12:00";
  startTime: any = "12:00";
  location:any = [];
  constructor(private router: Router, private commonService: AuthenticationService) {
    this.location = this.commonService.getPlaces();
    this.loginData = localStorage.getItem("loginData");
    this.loginData = JSON.parse(this.loginData);
    if (this.loginData?.email == "admin")
      this.router.navigate(["admin-home"]);
    else this.router.navigate(["home"]);
    this.getCities();
    this.getPlaceDetails();
  }
  cities = [];
  getCities() {
    let data = this.commonService.getCitiesByState().subscribe((data) => {
      console.log(data);
    });
    console.log(data)
  }
  search() {
    if (this.vehicleData.type && this.vehicleData.startDate && this.vehicleData.endDate && this.vehicleData.origin
      && this.vehicleData.destination) {
      this.startTime = new Date(`${this.vehicleData.startDate}T${this.startTime}`);
      this.endTime = new Date(`${this.vehicleData.endDate}T${this.endTime}`);
      const timeDifference = new Date(this.vehicleData.endDate).getTime() - new Date(this.vehicleData.startDate).getTime();
      const dayDifference = timeDifference / (1000 * 3600 * 24);
      let days = Math.abs(Math.round(dayDifference));
      console.log(days);
      this.vehicleData.days = days;
      localStorage.setItem("searchData", JSON.stringify(this.vehicleData));
      this.router.navigate(['/vehicle-list']);
    }
    else this.commonService.showMessage("Add madatory field", "error");
  }

  getPlaceDetails() {
    this.commonService.getPlace().subscribe((data: any) => {
      this.list = data;
      console.log(data);
      this.list.forEach((data:any) => {
        data.image = "data:" + data.filetype + ";base64," + data.image.toString();
      })
      console.log(this.list)
    })
  }
}
