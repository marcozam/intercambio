import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GroupAssignationComponent } from "./group-assignation.component";

describe("GroupAssignationComponent", () => {
  let component: GroupAssignationComponent;
  let fixture: ComponentFixture<GroupAssignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupAssignationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAssignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
