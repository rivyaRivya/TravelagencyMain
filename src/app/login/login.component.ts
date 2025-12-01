import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/commonService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string ="";
  password: string = "";
  constructor(private router: Router, private commonService: AuthenticationService) {
  }
  login() {
    if (this.email && this.password) {
     
      this.commonService.login(this.email, this.password).subscribe((data:any) => {
        console.log(data);
        if (data) {
          let params = {
            email: this.email,
            password: this.password,
            id:data
          }
          localStorage.setItem("loginData", JSON.stringify(params));
         if (this.email == 'admin' && this.password == 'admin') {
            this.router.navigate(['admin-home']);
          }
          else {
            this.router.navigate(['home']);
          }
        }
      })
      
    }
  }
}
