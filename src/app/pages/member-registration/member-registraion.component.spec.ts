import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRegistraionComponent } from './member-registraion.component';

describe('MemberRegistraionComponent', () => {
  let component: MemberRegistraionComponent;
  let fixture: ComponentFixture<MemberRegistraionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRegistraionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRegistraionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
