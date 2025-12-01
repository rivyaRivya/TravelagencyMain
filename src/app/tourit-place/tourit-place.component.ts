import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/commonService.service';

@Component({
  selector: 'app-tourit-place',
  templateUrl: './tourit-place.component.html',
  styleUrl: './tourit-place.component.css'
})
export class TouritPlaceComponent {
  header = ["", "Name", "District", "Description", "View","Delete"]
  list = [{
    id: 1,
    name: "Vythiri",
    district: "Wayanad",
    description: "Manu",
    image: "",
    filetype:""
  }]
  constructor(private router: Router, private commonService: AuthenticationService) {
    this.getPlaceDetails();
  }
  getPlaceDetails() {
    this.commonService.getPlace().subscribe((data : any) => {
      this.list = data;
      console.log(this.list)
      this.list.forEach((data) => {
        if (data.image)
        data.image = "data:" + data.filetype + ";base64," + data.image.toString();
      })
    })
  }
  viewDetails(id: any) {
    console.log("yy")
    this.router.navigate(["/place-details/", id]);
  }
  newPlace() {
    this.router.navigate(["/place-details/", "new"]);
  }

  deletePlace(id: number) {
    this.commonService.deletePlace(id).subscribe((data) => {
      this.getPlaceDetails();
    })
  }
}
