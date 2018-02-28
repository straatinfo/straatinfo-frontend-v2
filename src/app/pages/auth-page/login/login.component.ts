import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select } from '@angular-redux/store'; 

import { SessionActionCreator } from '../../../store/action-creators';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  @select(s => s.session.spinner) sessionSpinner;
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;

  public signInForm: FormGroup;

  constructor(
    private element: ElementRef,
    private formBuilder: FormBuilder,
    private sessionActionCreator: SessionActionCreator
  ) 
    {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
    this.sessionActionCreator.SessionDestroy();
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      loginName: [null, Validators.required],
      password: [null, Validators.required]
    });
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700);
  }
  sidebarToggle() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName('body')[0];
    var sidebar = document.getElementsByClassName('navbar-collapse')[0];
    if (this.sidebarVisible == false) {
      setTimeout(function () {
        toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }
  submit(){
    if (this.signInForm.valid) {
      this.sessionActionCreator.Login(this.signInForm.value);
    } else {
      alert('Invalid form');
    }
  }

  forgotPasswordToggle() {
    // forgot password logic here
  }
}
