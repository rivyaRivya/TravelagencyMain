import { Component } from '@angular/core';
import { AuthenticationService } from '../services/commonService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  userData = {
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    pin: "",
    address: "",
    city: "",
    password:""
  }

  constructor(private commonService: AuthenticationService,
    private router: Router) { }
  registerUser() {
    console.log(this.userData)
    if (this.userData.email && this.userData.password && this.userData.firstname && this.userData.lastname && this.userData.mobile) {
      this.commonService.registerUser(this.userData).subscribe((data) => {
        console.log(data);
        this.commonService.showMessage("Registered Successfullly", "success")
        this.router.navigate(["/login/"]);
      }, error => {
        this.commonService.showMessage("Registered Successfullly please login", "success")
        this.router.navigate(["/login/"]);
      })
    } else {
      this.commonService.showMessage("Mandatory fields are required", "error");
    }
  }
}
