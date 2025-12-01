import { Component, TemplateRef } from '@angular/core';
import { AuthenticationService } from '../services/commonService.service';

import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ModalComponent } from '../modal/modal/modal.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
  providers: [BsModalService],
})
export class AdminHomeComponent {
  header = ["", "Name", "Email", "Phone", "Booking Date", "From - To", "Date", "Amount", "Booking Status","Vehicle","Driver","Action"]
  bookings:any = []

  constructor(private commonService: AuthenticationService, private modalService: BsModalService, public bsModalRef: BsModalRef) {
    this.getBooking();
  }
  modalRef?: BsModalRef;

  getBooking() {
    this.commonService.getBooking().subscribe((data: any) => {
      console.log(data);
      this.bookings = data;
    })
  }

  allocateDriver(data: any) {
    console.log(data);
    this.commonService.findDriver(data.startdate, data.enddate, data.type).subscribe((driverData: any) => {
      console.log(driverData);
      this.openModal(driverData, data);
    })
  }

  openModal(driverData: any, bookingInfo: any) {
    driverData = { drivers: driverData }
    const initialState = driverData;
    this.modalRef = this.modalService.show(ModalComponent,Object.assign({}, { class: 'modal-sm', initialState }))
    this.modalRef?.content.event.subscribe((driverId: any) => {
      console.log(driverData, driverId);
      this.modalRef?.hide();
      if (driverId) {
        bookingInfo.driverId = driverId;
        this.commonService.allocateDriver(bookingInfo.id, bookingInfo).subscribe((data:any) => {
          console.log(data);
          this.getBooking();
        });
      }
    })
  }
 
}
