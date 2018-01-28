import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostRegistrationComponent } from './host-registration.component';

describe('HostRegistraionComponent', () => {
  let component: HostRegistrationComponent;
  let fixture: ComponentFixture<HostRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
