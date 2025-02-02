import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeIntervalCountUpComponent } from './time-interval-count-up.component';

describe('TimeIntervalCountUpComponent', () => {
  let component: TimeIntervalCountUpComponent;
  let fixture: ComponentFixture<TimeIntervalCountUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeIntervalCountUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeIntervalCountUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
