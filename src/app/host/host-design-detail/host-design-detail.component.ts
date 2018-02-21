import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { DesignActionCreator } from '../../store/action-creators';
import { IDesign } from 'app/interface/design/design.interface';

import { BACKEND_URL } from '../../config';

@Component({
  selector: 'app-host-design-detail',
  templateUrl: './host-design-detail.component.html',
  styleUrls: ['./host-design-detail.component.scss']
})

export class HostDesignDetailComponent implements OnInit, OnDestroy {

  public uploadUrl: string;
  public hostId: string;
  public hostDesignForm: FormGroup;
  private routeParamsSubscription: Subscription = null;
  private designSubscription: Subscription = null;
  private designErrorSubscription: Subscription = null;
  public errorText: string = null;
  public successText: string = null;
  @select(s => s.design.error) designStoreError;
  @select(s => s.design.selectedDesign) selectedDesign;

  constructor(
    private actvatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private designActionCreator: DesignActionCreator
  ) { }

  ngOnInit() {

    this.routeParamsSubscription = this.actvatedRoute.params
        .subscribe(
        params => {            
            this.uploadUrl = `${BACKEND_URL}/v1/api/design/${params._id}`;     
            this.designActionCreator.SelectDesign(params._id);
            this.designSubscription = this.selectedDesign
                .subscribe(
                design => {
                    this.hostId = design._host._id;
                    var imageUrl = design.secure_url;
                    if (design.secure_url == null)
                        imageUrl = `${BACKEND_URL}/assets/img/no_image_available.jpg`;

                    this.hostDesignForm = this.formBuilder.group({
                        _id: [design._id, Validators.required],
                        designName: [design.designName, Validators.required],
                        colorOne: [design.colorOne, Validators.required],
                        colorTwo: [design.colorTwo, Validators.required],
                        colorThree: [design.colorThree, Validators.required],
                        secure_url: [imageUrl, Validators.required],
                    });
                }
                );
        }
      );
  }

  ngOnDestroy() {
    (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
    (this.designSubscription) ? this.designSubscription.unsubscribe() : null;
    (this.designErrorSubscription) ? this.designErrorSubscription.unsubscribe() : null;
  }

  onColorOneEvent(value: string) {
    this.hostDesignForm.value.colorOne = value;
  }

  onColorTwoEvent(value: string) {
    this.hostDesignForm.value.colorTwo = value;
  }

  onColorThreeEvent(value: string) {
    this.hostDesignForm.value.colorThree = value;
  }

  onBack() {
      this.router.navigate([`admin/host/design/${this.hostId}`]);
  }

  onUpdate() {   
      this.errorText = null;
      this.successText = null;
      this.designActionCreator.UpdateDesign(this.hostDesignForm.value._id, this.hostDesignForm.value);
      this.designErrorSubscription = this.designStoreError.subscribe(
          error => {
              if (error) {
                  console.log(error);
                  this.errorText = error;
              } else {
                  this.successText = 'Design has been updated.';
              }
          }
      );
  }
}
