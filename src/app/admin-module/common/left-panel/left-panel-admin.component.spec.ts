import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPanelAdminComponent } from './left-panel-admin.component';

describe('LeftPanelAdminComponent', () => {
  let component: LeftPanelAdminComponent;
  let fixture: ComponentFixture<LeftPanelAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftPanelAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPanelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
