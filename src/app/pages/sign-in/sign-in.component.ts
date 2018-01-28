import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select } from '@angular-redux/store'; 
import { SessionActionCreator } from '../../store/action-creators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  private loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sessionActionCreator: SessionActionCreator
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginName: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit(){
    if (this.loginForm.valid) {
      this.sessionActionCreator.Login(this.loginForm.value);
    }
  }
}
