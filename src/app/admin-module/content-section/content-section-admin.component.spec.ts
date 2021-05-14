import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSectionAdminComponent } from './content-section-admin.component';

describe('ContentSectionAdminComponent', () => {
  let component: ContentSectionAdminComponent;
  let fixture: ComponentFixture<ContentSectionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentSectionAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSectionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
