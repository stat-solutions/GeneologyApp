import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:Client/src/app/auth-module/components/forgot-login/forgot-login.component.spec.ts
import { ForgotLoginComponent } from './forgot-login.component';

describe('ForgotLoginComponent', () => {
  let component: ForgotLoginComponent;
  let fixture: ComponentFixture<ForgotLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotLoginComponent ]
=======
import { ConstantsTableComponent } from './constants-table.component';

describe('ConstantsTableComponent', () => {
  let component: ConstantsTableComponent;
  let fixture: ComponentFixture<ConstantsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstantsTableComponent ]
>>>>>>> 199b2f1... modified-data:Client/src/app/admin-module/components/constants-table/constants-table.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:Client/src/app/auth-module/components/forgot-login/forgot-login.component.spec.ts
    fixture = TestBed.createComponent(ForgotLoginComponent);
=======
    fixture = TestBed.createComponent(ConstantsTableComponent);
>>>>>>> 199b2f1... modified-data:Client/src/app/admin-module/components/constants-table/constants-table.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
