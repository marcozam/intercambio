import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarazoComponent } from './embarazo.component';

describe('EmbarazoComponent', () => {
  let component: EmbarazoComponent;
  let fixture: ComponentFixture<EmbarazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbarazoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbarazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
