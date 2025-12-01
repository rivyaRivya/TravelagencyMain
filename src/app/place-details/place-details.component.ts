import { Component } from '@angular/core';
import { AuthenticationService } from '../services/commonService.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrl: './place-details.component.css'
})
export class PlaceDetailsComponent {
  placeData = {
    image:"",
    name: "",
    district: "",
    description: "",
    filetype:"",
  }

imageSrc: any;
  id: any;
  filetype: any;
  location: any;
  constructor(private commonService: AuthenticationService,
    private router: Router, private route: ActivatedRoute) {

    this.location = this.commonService.getPlaces();
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    if (this.id != "new")
      this.getPlaceDetails();
  }

  getPlaceDetails() {
    this.commonService.getPlaceDetails(this.id).subscribe((data : any) => {
      this.placeData = data;
      this.imageSrc = "data:" + data.filetype + ";base64," + data.image.toString();
    })
  }
  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.filetype = file.type;
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        console.log(e.target.result)
        const byte = e.target.result.split('base64,')[1];
        this.imageSrc = reader.result as String;
        this.placeData.image = byte || "";
      };
    }
  }

  saveAndUpdate() {
    if (this.id == "new")
      this.save()
    else this.update();
  }
  save() {
    if (this.placeData.image)
      this.placeData.filetype = this.filetype 
    this.commonService.addPlace(this.placeData).subscribe((data) => {
      console.log(data);
      this.router.navigate(["/place"]);
      this.commonService.showMessage("Place added successfully", "success");
    }, error => {
      this.router.navigate(["/place"]);
    });
  }

  update() {
    if (this.placeData.image)
      this.placeData.filetype = this.filetype
   this.commonService.updatePlaceDetails(this.id, this.placeData).subscribe((data) => {
      console.log(data);
      this.commonService.showMessage("Place updated successfully", "success");
      this.router.navigate(["/place"]);
    }, error => {

      this.router.navigate(["/place"]);
    })
  }
}
