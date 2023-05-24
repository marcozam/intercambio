import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveRaffleComponent } from './live-raffle.component';

describe('LiveRaffleComponent', () => {
  let component: LiveRaffleComponent;
  let fixture: ComponentFixture<LiveRaffleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveRaffleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveRaffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
