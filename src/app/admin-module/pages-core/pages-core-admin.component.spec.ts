import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesCoreAdminComponent } from './pages-core-admin.component';


describe('PagesCoreAdminComponent', () => {
  let component: PagesCoreAdminComponent;
  let fixture: ComponentFixture<PagesCoreAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesCoreAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesCoreAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
