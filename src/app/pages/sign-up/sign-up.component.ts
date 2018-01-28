import { Component, OnInit } from '@angular/core';
import { SessionActionCreator } from '../../store/action-creators';
import { IUserNew } from 'app/interface/user/user-new.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  private isRegisteringAsMember: boolean;
  private registrationText: string;
  constructor(
    private sessionActionCreator: SessionActionCreator
  ) { }

  ngOnInit() {
    this.isRegisteringAsMember = true;
    this.registrationText = 'Register as Host';
  }

  toggleRegistration () {
    if (this.isRegisteringAsMember) {
      this.isRegisteringAsMember = false;
      this.registrationText = 'Register as Member';
    } else {
      this.isRegisteringAsMember = true;
      this.registrationText = 'Register as Host';
    }
  }

  onSubmit(userNew: IUserNew) {
    if (userNew.email) {
      this.sessionActionCreator.Register(userNew);
    }
  }
}
