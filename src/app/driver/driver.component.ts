import { Component } from '@angular/core';
import { AuthenticationService } from '../services/commonService.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent {
  driverData = {
    firstname: "",
    lastname: "",
    dob: "",
    email: "",
    mobile: "",
    gender: "",
    district: "",
    address: "",
    pin: "",
    city: "",
    vehicleid: null,
    type:""
  }
  firstname: any = "";
  id: any;
  list: any = [];
  data = ["Car", "Bus", "Travaller"]
  constructor(private commonService: AuthenticationService,
    private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.getVehicleDetails();
    if (this.id != "new")
      this.getDriverDetails();
  }
  getDriverDetails() {
    this.commonService.getDriverDetails(this.id).subscribe((data:any) => {
      console.log("data", data);
      this.driverData = data;
    })
  }
  addDriver() {
    this.commonService.addDriver(this.driverData).subscribe((data:any) => {
      console.log(data);
      this.router.navigate(["/driver"]);
      this.commonService.showMessage("Driver added successfullly", "success")
    }, error => {
      this.router.navigate(["/driver"]);
    })
  }

  addEditDriver() {
    if (this.driverData.email && this.driverData.mobile && this.driverData.type) {
      this.driverData.type = this.driverData.type.toString();
      if (this.id == "new")
        this.addDriver();
      else this.updateDriver();
    } else {
      this.commonService.showMessage("Add mandatory fields","error")
    }
  }

  updateDriver() {
    this.commonService.updateDriverDetails(this.id, this.driverData).subscribe((data:any) => {
      this.commonService.showMessage("Driver updated successfullly", "success");
      console.log("success");
      this.router.navigate(["/driver"]);
    })
  }

  getVehicleDetails() {
    this.commonService.getVehicle().subscribe((data: any) => {
      this.list = data;
    })
  }
}
