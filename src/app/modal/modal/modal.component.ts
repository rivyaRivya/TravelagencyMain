import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() drivers: any = [];
  driver: any;
  public event: EventEmitter<any> = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
    console.log(this.drivers);
    this.drivers = this.drivers;
  }

  allocate() {
    console.log(this.driver);
    this.event.emit(this.driver);
  }
}
