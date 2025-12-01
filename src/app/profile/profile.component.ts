import { Component } from '@angular/core';
import { AuthenticationService } from '../services/commonService.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userData:any = {
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    pin: "",
    address: "",
    city: ""
  }
  id: any;
  loginData: any;
  constructor(private commonService: AuthenticationService) {
    this.loginData = localStorage.getItem("loginData");
    this.loginData = JSON.parse(this.loginData);
    this.id = this.loginData.id;
    this.getUserDetails();
  }
  getUserDetails() {
    this.commonService.getUserDetails(this.id).subscribe((data:any) => {
      this.userData = data;
    })
  }
  updateUser() {
    this.commonService.updateUserDetails(this.id,this.userData).subscribe((data: any) => {
      this.commonService.showMessage("Your profile updated successfully", "success");
    })
  }
}
