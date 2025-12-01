import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/commonService.service';

@Component({
  selector: 'app-vehicle-list-admin',
  templateUrl: './vehicle-list-admin.component.html',
  styleUrl: './vehicle-list-admin.component.css'
})
export class VehicleListAdminComponent {
  header = ["", "Type", "Name", "Number of seat","Package/day", "View","Delete"]
  list:any = [{
    id:1,
    type: "Car",
    name:"",
    seatcount: "4",
    availablity:"",
    amount: "5000",
    image: "",
    filetype:""
  }]
  driverList:any = [];
  constructor(private router: Router, private commonService: AuthenticationService) {
    this.getVehicleDetails();
  }
  getVehicleDetails() {
    this.commonService.getVehicle().subscribe((data:any) => {
      this.list = data;
      console.log(this.list);
      this.list.forEach((data:any) => {
        if(data.image)
          data.image = "data:" + data.filetype + ";base64," + data.image.toString();
      })
    })
  }
 
  newVehicle() {
    this.router.navigate(["/vehicle/", "new"]);
  }
  viewDetails(id: number) {
    this.router.navigate(["/vehicle/",id]);
  }

  deleteVehicle(id: number) {
    this.commonService.deleteVehicle(id).subscribe((data) => {
      this.getVehicleDetails()
    })
  }
}
