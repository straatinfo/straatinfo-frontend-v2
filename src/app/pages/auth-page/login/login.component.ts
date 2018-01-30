import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select } from '@angular-redux/store'; 
import { SessionActionCreator } from '../../../store/action-creators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
