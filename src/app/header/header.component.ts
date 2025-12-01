import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  collapsed = true;
    loginData: any;
  header: { name: string; url: string; }[] = [];
  isLogin: boolean = false;
  constructor(private router: Router) {
  }
  ngOnInit() {
    this.loginData = localStorage.getItem("loginData");
    this.loginData = JSON.parse(this.loginData);
    this.isLogin = false;
    if (this.loginData) {
      this.isLogin = true;
      if (this.loginData.email != "admin") {
        this.header = [{ name: "Home", url: "/home" },
          { name: "Profile", url: "/profile" },
          { name: "My Bookings", url: "/bookings" }]
      } else {
        this.header = [{ name: "Home", url: "/admin-home" },
        { name: "Vehicle", url: "/vehicle" },
        { name: "Tourist place", url: "/place" },
        { name: "Driver", url: "/driver" }]
      }
    } else {
      this.isLogin = false;
      this.header = [{ name: "Home", url: "/home" }]
    }
  }

  logout() {
    localStorage.setItem("loginData", "");
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
