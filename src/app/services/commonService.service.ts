import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
declare var google :any;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   
  users: any[] = [];
  geocoder: google.maps.Geocoder;
  url = 'http://192.168.31.244:8080/';
  bookingDetails = new BehaviorSubject<any | null>(null);
  vehicleData = new BehaviorSubject<any | null>(null);
  constructor(private http: HttpClient, private toastr: ToastrService) {
  this.geocoder = new google.maps.Geocoder();
}

  ngOnInit(): void {
    
  }
  registerUser(data:any) {

    // return API response
    return this.http.post(this.url + 'add',data);
  }
  addDriver(data: any) {

    // return API response
    return this.http.post(this.url + 'add-driver', data);
  }

  getDrivers() {
    return this.http.get(this.url + 'get-driver');
  }

  getDriverDetails(id:any) {
    return this.http.get(this.url + 'get-driver-details?id='+id);
  }

  updateDriverDetails(id:any,data:any) {
    return this.http.put(this.url + 'update-driver/' + id, data);
  }

  deleteDriver(id:any) {
    return this.http.delete(this.url + 'delete/' + id);
  }

  addVehcile(data: any) {

    // return API response
    return this.http.post(this.url + 'add-vehicle', data);
  }
  getVehicle() {
    return this.http.get(this.url + 'get-vehicle');
  }

  getVehicleDetails(id: any) {
    return this.http.get(this.url + 'get-vehicle-details?id=' + id);
  }

  updateVehicleDetails(id: any, data: any) {
    return this.http.put(this.url + 'update-vehicle/' + id, data);
  }

  deleteVehicle(id: any) {
    return this.http.delete(this.url + 'delete-vehicle/' + id);
  }
  addPlace(data: any) {
    return this.http.post(this.url + 'add-place', data)
  }
  getPlace() {
    return this.http.get(this.url + 'get-place');
  }

  getPlaceDetails(id: any) {
    return this.http.get(this.url + 'get-place-details?id=' + id);
  }

  updatePlaceDetails(id: any, data: any) {
    return this.http.put(this.url + 'update-place/' + id, data);
  }

  deletePlace(id: any) {
    return this.http.delete(this.url + 'delete-place/' + id);
  }

  addDriverToVehicle(id: any, driver: any) {
    return this.http.post(this.url + '/{vehicleid}/drivers',driver);
  }

  createOrder(amount: any) {
    return this.http.get(this.url + 'createOrder/' + amount);
  }

  showMessage(message: string, type: string) {
    if(type == "success")
      this.toastr.success(message, 'Success', { positionClass:'toast-top-center' });
    else
      this.toastr.error(message, 'Error', { positionClass:'toast-top-center'});
  }
  apiKey = "AIzaSyCAIwTPctnSM2PWcbK6cMdlZaSgEYIKp5U";
  getCitiesByState() { 
    let url = "https://maps.googleapis.com/maps/api/geocode/json";
    const geocodeParams = {
      address: "kerala",
      key: 'AIzaSyCN-F_GuqrjgclmIllrMna_vntLdf52KJw'
    };

    return this.http.get<any>(url, { params: geocodeParams });
  }

  addbookingDetails(details: any) {
    console.log(details)
    this.bookingDetails.next(details);
  }

  getBookingDetails() {
    return this.bookingDetails.asObservable();
  }

  createBooking(vehicleId: any, startdate: any, enddate: any, bookingdate: any, transactionid: any, status: any, origin: any, destination: any, userId: any, driverId: any, amount: any, confirmed: any) {
    return this.http.post(this.url + 'bookings?bookinginfo=', { vehicleId, enddate, startdate, bookingdate, transactionid, status, origin, destination, userId, driverId, amount, confirmed })
  }
  login(email: any, password: any) {
    console.log(email, password)
    let data = { email, password }
    HttpParams
    const params = { email: email, password: password }
    return this.http.post(this.url + 'login?data=' , params);
  }

  updatePaymentStatus(id :any) {
    return this.http.put(this.url + 'update-status/' + id, null);
  }
  getBooking() {
    return this.http.get(this.url + 'get-bookings');
  }

  findVehicle( startdate: any, enddate: any,type:any) {
    return this.http.get(this.url + 'available?startDate=' + startdate + '&endDate=' + enddate + '&type=' + type);
  }
  getPlacesUnderDistrict(place: String) {
    return this.http.get(this.url + 'get-place-district?place=' + place);
  }

  getUserDetails(id: any) {
    return this.http.get(this.url + 'user-details?id=' + id);
  }

  updateUserDetails(id: any, data: any) {
    return this.http.put(this.url + 'update-user/' + id, data);
  }
  findDriver(startdate: any, enddate: any, type: any) {
    return this.http.get(this.url + 'available-driver?startDate=' + startdate + '&endDate=' + enddate + '&type=' + type);
  }
  updateBooking(id: any, data: any) {
    return this.http.put(this.url + 'cancel-booking/' + id, null);
  }
  allocateDriver(id: any, data: any) {
    return this.http.put(this.url + 'update-booking/' + id, data);
  }

  getPlaces():any {
    let data = ["Thiruvananthapuram",
      "Kollam",
      "Pathanamthitta",
      "Alappuzha",
      "Kottayam",
      "Idukki",
      "Ernakulam",
      "Thrissur",
      "Palakkad",
      "Malappuram",
      "Kozhikode",
      "Wayanad",
      "Kannur",
      "Kasaragod"]
    return data;
  }
}
