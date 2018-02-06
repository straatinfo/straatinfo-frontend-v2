import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { ReportActionCreator } from '../../store/action-creators';
import { IReport } from 'app/interface/report/report.interface';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})

export class ReportDetailComponent implements OnInit, OnDestroy {

  public reportDetailForm: FormGroup;
  private routeParamsSubscription: Subscription = null;
  private reportSubscription: Subscription = null;
  @select(s => s.report.selectedReport) selectedReport;

  constructor(
    private actvatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private reportActionCreator: ReportActionCreator
  ) { }

  ngOnInit() {
    this.routeParamsSubscription = this.actvatedRoute.params
    .subscribe(
      params => {
        this.reportActionCreator.SelectReport(params._id);
        this.reportSubscription = this.selectedReport
        .subscribe(
          report => {
            this.reportDetailForm = this.formBuilder.group({
              _id: [report._id, Validators.required],
              host: [report.host, Validators.required],
              title: [report.title, Validators.required],
              description: [report.description, Validators.required],
              reportType: [report.reportType, Validators.required],
              mainCategory: [report.mainCategory, Validators.required],
              subCategory: [report.subCategory, Validators.required],
              location: [report.location, Validators.required],
              long: [report.long, Validators.required],
              lat: [report.lat, Validators.required],
              isVehicleInvolved: [report.isVehicleInvolved, Validators.required],
              vehicleInvolvedDescription: [report.vehicleInvolvedDescription, Validators.required],
              isPeopleInvolved: [report.isPeopleInvolved, Validators.required],
              peopleInvolvedCount: [report.peopleInvolvedCount, Validators.required],
              note: [report.note, Validators.required],
            });
          }
        );
      }
    );
  }

  ngOnDestroy() {
    (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
    (this.reportSubscription) ? this.reportSubscription.unsubscribe() : null;
  }

  onUpdate() {
     if (this.reportDetailForm.valid) {
         this.reportActionCreator.UpdateReport(this.reportDetailForm.value._id, this.reportDetailForm.value.note, this.reportDetailForm.value);
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
         this.reportActionCreator.DeleteReport(this.reportDetailForm.value._id, this.reportDetailForm.value);
         swal(
           'Deleted!',
           `${this.reportDetailForm.value.title} has been deleted.`,
           'success'
         );
       }
     }).then(() => {
       this.router.navigate(['admin/report']);
     });
  }
}
