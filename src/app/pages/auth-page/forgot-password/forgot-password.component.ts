import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select } from '@angular-redux/store'; 
import swal from 'sweetalert2';
import { SessionActionCreator } from '../../../store/action-creators';
declare var $: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})

export class ForgotPasswordComponent implements OnInit {

  @select(s => s.session.spinner) sessionSpinner;
  test: Date = new Date();
  public forgotPasswordForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sessionActionCreator: SessionActionCreator
  ) 
  {
    this.sessionActionCreator.SessionDestroy();
  }

  ngOnInit() {
      this.forgotPasswordForm = this.formBuilder.group({
      loginName: [null, Validators.required],
    });

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700);
  }

  submit() {
      this.sessionActionCreator.ForgotPassword(this.forgotPasswordForm.value.loginName, (err, data) => {
          if (err) {
              return swal('Forgot Password Error', err, 'error');
          }
          swal('Forgot Password Success', data, 'success');
          this.router.navigate([`auth/login`]);
      });
     
  }
}
