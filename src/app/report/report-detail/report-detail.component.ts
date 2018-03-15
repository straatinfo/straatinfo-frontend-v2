import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { ReportActionCreator } from '../../store/action-creators';
import { IReport } from 'app/interface/report/report.interface';
import { IReportView } from 'app/interface/report/report-view.interface';
import { ISession } from 'app/interface/session/session.interface';
import { IRole } from 'app/interface/role/role.interface';
import { IReportStore } from '../../store/report.store';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})

export class ReportDetailComponent implements OnInit, DoCheck, OnDestroy {

  public reportDetailForm: FormGroup;
  private routeParamsSubscription: Subscription = null;
  private reportSubscription: Subscription = null;
  private reportErrorSubscription: Subscription = null;
  public errorText: string = null;
  public successText: string = null;
  // variables to check
  public reportData: IReportView = null
  public loadReportData: boolean = false;
  public errorMessage: string = null;
  public successMessage: string = null;

  @select(s => s.report.error) reportStoreError;
  @select(s => s.report.selectedReport) selectedReport;
  @select(s => s.report.spinner) reportSpinner;
  @select(s => s.report) report$: Observable<IReportStore>;

  public session: ISession = JSON.parse(localStorage.getItem('session'));
  public _role: IRole = this.session.user._role;

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
            (report: IReportView) => {
                this.reportData = (report) ? report : null;
                this.loadReportData = true;            
          }
        );
      }
      );
  }

  ngDoCheck() {
      if (this.reportData && this.loadReportData) this.onLoadForm(this.reportData);
      if (this.successMessage) this.onSuccessMessage(this.successMessage);
      if (this.errorMessage) this.onErrorMessage(this.errorMessage);
  }

  ngOnDestroy() {
    (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
    (this.reportSubscription) ? this.reportSubscription.unsubscribe() : null;
    (this.reportErrorSubscription) ? this.reportErrorSubscription.unsubscribe() : null;
  }

  onLoadForm(report: IReportView) {

      this.reportDetailForm = this.formBuilder.group({
          _id: [report._id, Validators.required],
          hostName: [{ value: report._hostName, disabled: true }, Validators.required],
          title: [{ value: report.title, disabled: true }, Validators.required],
          description: [{ value: report.description, disabled: true }, Validators.required],
          reportType: [{ value: report._reportTypeCode, disabled: true }, Validators.required],
          mainCategory: [{ value: report._mainCategoryName, disabled: true }, Validators.required],
          subCategory: [{ value: report._subCategoryName, disabled: true }, Validators.required],
          location: [{ value: report.location, disabled: true }, Validators.required],
          long: [{ value: report.long, disabled: true }, Validators.required],
          lat: [{ value: report.lat, disabled: true }, Validators.required],
          isVehicleInvolved: [{ value: report.isVehicleInvolved, disabled: true }, Validators.required],
          vehicleInvolvedDescription: [{ value: report.vehicleInvolvedDescription, disabled: true }, Validators.required],
          isPeopleInvolved: [{ value: report.isPeopleInvolved, disabled: true }, Validators.required],
          peopleInvolvedCount: [{ value: report.peopleInvolvedCount, disabled: true }, Validators.required],
          note: [report.note, Validators.required],
          status: [report.status, Validators.required]
      });

      this.loadReportData = false;
  }

  onErrorMessage(error: string) {
      this.errorText = error;
      this.successText = null;
  }

  onSuccessMessage(success: string) {
      this.successText = success;
      this.errorText = null;
  }

  onUpdate() {
      this.errorText = null;
      this.successText = null;
      this.reportActionCreator.UpdateReport(this.reportDetailForm.value._id, this.reportDetailForm.value.note, (this.reportDetailForm.value.status) ? this.reportDetailForm.value.status : 'Unresolved');
      this.reportErrorSubscription = this.report$
          .subscribe(
          (report: IReportStore) => {
              if (report.error) this.errorMessage = report.error;
              if (report.success) this.successMessage = report.success;
              this.loadReportData = false;
          }
      );
  }

  onBack() {
    this.router.navigate([`${this._role.code.toLowerCase()}/report`]);
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
       this.router.navigate([`${this._role.code.toLowerCase()}/report`]);
     });
  }
}
