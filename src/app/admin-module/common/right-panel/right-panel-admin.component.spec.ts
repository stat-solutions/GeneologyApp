import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPanelAdminComponent } from './right-panel-admin.component';

describe('RightPanelAdminComponent', () => {
  let component: RightPanelAdminComponent;
  let fixture: ComponentFixture<RightPanelAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightPanelAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightPanelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
