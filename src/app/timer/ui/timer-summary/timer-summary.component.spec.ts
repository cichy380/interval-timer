import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerSummaryComponent } from './timer-summary.component';

describe('TimerSummaryComponent', () => {
  let component: TimerSummaryComponent;
  let fixture: ComponentFixture<TimerSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
