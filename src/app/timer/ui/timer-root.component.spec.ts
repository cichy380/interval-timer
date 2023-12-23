import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerRootComponent } from './timer-root.component';

describe('TimerRootComponent', () => {
  let component: TimerRootComponent;
  let fixture: ComponentFixture<TimerRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
