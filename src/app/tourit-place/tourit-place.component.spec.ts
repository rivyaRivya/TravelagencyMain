import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouritPlaceComponent } from './tourit-place.component';

describe('TouritPlaceComponent', () => {
  let component: TouritPlaceComponent;
  let fixture: ComponentFixture<TouritPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TouritPlaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TouritPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
