import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListAdminComponent } from './vehicle-list-admin.component';

describe('VehicleListAdminComponent', () => {
  let component: VehicleListAdminComponent;
  let fixture: ComponentFixture<VehicleListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleListAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
