import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRootComponent } from './history-root.component';

describe('HistoryRootComponent', () => {
  let component: HistoryRootComponent;
  let fixture: ComponentFixture<HistoryRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryRootComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
