import { Component } from '@angular/core';
import { AuthenticationService } from '../services/commonService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isAnyArrayBuffer } from 'util/types';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css'
})
export class VehicleDetailsComponent {
  vehicleData = {
    name: "",
    amount:null || 0,
    seatcount: null || 0,
    type: "",
    availablity: null || 0,
    image: "",
    filetype: ""
  }
  filetype: any;
  imageSrc: any;
  driverList: any = [];
  id: any;
  constructor(private router: Router, private commonService: AuthenticationService, private route: ActivatedRoute) {
    this.getDriverList();
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    if (this.id != "new")
      this.getVehicleDetails();
  }

  getVehicleDetails() {
    this.commonService.getVehicleDetails(this.id).subscribe((data : any) => {
      this.vehicleData = data;
      this.imageSrc = "data:"+data.filetype+";base64,"+data.image.toString();
      console.log(this.imageSrc)
    })
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.filetype = file.type;
      console.log(this.filetype);
      reader.readAsDataURL(file);
      reader.onload = (e:any) => {
        const byte = e.target.result.split('base64,')[1];
        this.imageSrc = reader.result as String;
        this.vehicleData.image = byte || "";
      };
    }
  }

  addEdit() {
    if (this.id == "new") this.save();
    else this.update();
  }
  save() {
    console.log(this.vehicleData);
    if (this.vehicleData.amount && this.vehicleData.seatcount &&
      this.vehicleData.name && this.vehicleData.type ) {
      this.vehicleData.amount = this.vehicleData.amount ? Number(this.vehicleData.amount) : 0;
      this.vehicleData.seatcount = this.vehicleData.seatcount ? Number(this.vehicleData.seatcount) : 0;
      console.log(this.vehicleData);
      if (this.vehicleData.image)
        this.vehicleData.filetype = this.filetype 
      this.commonService.addVehcile(this.vehicleData).subscribe((data) => {
        console.log(data);
        this.commonService.showMessage("Driver added successfully", "success")
        this.router.navigate(["/vehicle"]);
      }, error => {
        this.router.navigate(["/vehicle"]);
      })
    } else {
      this.commonService.showMessage("Add all mandatory fields","error")
    }
  }

  update() {
    console.log(this.vehicleData);
    if (this.vehicleData.amount && this.vehicleData.seatcount && 
      this.vehicleData.name && this.vehicleData.type) {
      this.vehicleData.amount = this.vehicleData.amount ? Number(this.vehicleData.amount) : 0;
      this.vehicleData.seatcount = this.vehicleData.seatcount ? Number(this.vehicleData.seatcount) : 0;
      console.log(this.vehicleData);
      if (this.vehicleData.image)
        this.vehicleData.filetype = this.filetype 
      this.commonService.updateVehicleDetails(this.id, this.vehicleData).subscribe((data) => {

        this.commonService.showMessage("Driver updated successfully", "success")
        this.router.navigate(["/vehicle"]);
      }, error => {
        this.router.navigate(["/vehicle"]);
      })
    } else {
      this.commonService.showMessage("Add all mandatory fields", "error")
    }
  }
  getDriverList() {
    this.commonService.getDrivers().subscribe((data) => {
      this.driverList = data;
      console.log(data)
    })
  }
}
