import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/commonService.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.css'
})
export class DriverListComponent {
  header = ["", "First name","Last name","email","Vehicle", "Gender", "Mobile", "Address", "City","View","Delete"]
  list:any = [{
    id: 1,
    firstname: "Manu",
    email:"",
    lastname: "Ram",
    gender:"Male",
    mobile:837787874,
    district: "Wayanad",
    city: "Vythiri"
  }]
  constructor(private router: Router, private commonService: AuthenticationService) {
    this.listDrivers();
  }

  listDrivers() {
    this.commonService.getDrivers().subscribe((data: any) => {
      console.log(data);
      this.list = data;
    })
  }
  viewDetails(id: any) {
    this.router.navigate(["/driver-details/", id]);
  }
  newDriver() {
    this.router.navigate(["/driver-details/", "new"]);
  }

  delete(id:any) {
    this.commonService.deleteDriver(id).subscribe((data) => {
      console.log(data);
      this.commonService.showMessage("Driver deleted successfully","success")
      this.listDrivers();
    })
  }
}
