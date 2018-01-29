import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HostActionCreator } from '../../store/action-creators';
import { IHost } from '../../interface/host/host.interface';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-host-detail',
  templateUrl: './host-detail.component.html',
  styleUrls: ['./host-detail.component.scss']
})
export class HostDetailComponent implements OnInit, OnDestroy {

  @select(s => s.host.selectedHost) selectedHost;

  private registerForm: FormGroup;
  private routeParamSubscription: Subscription = null;
  private selectedHostSubscription: Subscription = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private hostActionCreator: HostActionCreator
  ) {
  
  }

  ngOnInit() {

    this.routeParamSubscription = this.activatedRoute.params
    .subscribe(
      params => {
        console.log(params);
        this.hostActionCreator.GetHostById(params.id);
        this.selectedHost
        .subscribe(
          (host: IHost) => {
            if (host) {
              this.registerForm = this.formBuilder.group({
                id: [host.id, Validators.required],
                hostName: [host.hostName, Validators.required],
                email: [host.email, Validators.email],
                username: [host.username, Validators.required],
                address: [host.address, Validators.required],
                postalCode: [host.postalCode, Validators.required],
                city: [host.city, Validators.required],
                nickName: [host.nickName],
                roleId: [2, Validators.required],
                long: [host.long, Validators.required],
                lat: [host.lat, Validators.required]
            });
            }
          }
        );
      }, err => {}, 
      () => {
      }
    )
  }

  ngOnDestroy () {
    (this.selectedHostSubscription) ? this.selectedHostSubscription.unsubscribe() : null;
    (this.selectedHostSubscription) ? this.selectedHostSubscription.unsubscribe() : null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.hostActionCreator.UpdateHost(this.registerForm.value.id, this.registerForm.value);
    }
  }

  goToList() {
    this.router.navigate(['admin/host-list']);
  }
}
