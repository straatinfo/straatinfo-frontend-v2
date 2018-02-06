import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { ReporterActionCreator } from '../../store/action-creators';
import { IReporter } from 'app/interface/reporter/reporter.interface';

@Component({
  selector: 'app-reporter-detail',
  templateUrl: './reporter-detail.component.html',
  styleUrls: ['./reporter-detail.component.scss']
})

export class ReporterDetailComponent implements OnInit, OnDestroy {

  public reporterDetailForm: FormGroup;
  private routeParamsSubscription: Subscription = null;
  private reporterSubscription: Subscription = null;
  @select(s => s.reporter.selectedReporter) selectedReporter;

  constructor(
    private actvatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private reporterActionCreator: ReporterActionCreator
  ) { }

  ngOnInit() {
    this.routeParamsSubscription = this.actvatedRoute.params
    .subscribe(
      params => {
        this.reporterActionCreator.SelectReporter(params._id);
        this.reporterSubscription = this.selectedReporter
        .subscribe(
          report => {
            this.reporterDetailForm = this.formBuilder.group({
                _id: [report._id, Validators.required],
                firstName: [report.firstName, Validators.required],
                lastName: [report.lastName, Validators.required],
                chatName: [report.chatName, Validators.required],
                volunteer: [report.volunteer, Validators.required],
                teamName: [report.teamName, Validators.required],
                hostName: [report.hostName, Validators.required],
                status1: [report.status1, Validators.required],
                status2: [report.status2, Validators.required],
            });
          }
        );
      }
    );
  }

  ngOnDestroy() {
    (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
    (this.reporterSubscription) ? this.reporterSubscription.unsubscribe() : null;
  }

  onUpdate() {
     if (this.reporterDetailForm.valid) {
         this.reporterActionCreator.UpdateReporter(this.reporterDetailForm.value._id);
     }
  }

  onDelete() {
     swal({
       title: 'Are you sure?',
       text: "You won't be able to revert this!",
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
     }).then((result) => {
       if (result) {
         this.reporterActionCreator.DeleteReporter(this.reporterDetailForm.value._id, this.reporterDetailForm.value);
         swal(
           'Deleted!',
           `${this.reporterDetailForm.value.firstName} has been deleted.`,
           'success'
         );
       }
     }).then(() => {
       this.router.navigate(['admin/reporter']);
     });
  }
}
