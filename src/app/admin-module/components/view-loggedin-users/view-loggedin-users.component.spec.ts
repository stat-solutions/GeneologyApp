import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoggedinUsersComponent } from './view-loggedin-users.component';

describe('ViewLoggedinUsersComponent', () => {
  let component: ViewLoggedinUsersComponent;
  let fixture: ComponentFixture<ViewLoggedinUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoggedinUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoggedinUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
