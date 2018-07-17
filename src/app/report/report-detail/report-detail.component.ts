import { Component, OnInit, DoCheck, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';
import * as _ from 'lodash';
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

export class ReportDetailComponent implements OnInit, DoCheck, OnChanges, OnDestroy, CanDeactivate<ReportDetailComponent> {

  public hostName = 'report.hostName';
  public reportDetails = 'report.reportDetails';
  public reportId = 'report.reportId';
  public description = 'report.description';
  public teamName = 'report.teamName';
  public dateReported = 'report.dateReported';
  public chatName = 'report.chatName';
  public publicIdNumber = 'report.publicIdNumber';
  public mainCategory = 'report.mainCategory';
  public subCategory = 'report.subCategory';
  public location = 'report.location';
  public longitude = 'report.longitude';
  public latitude = 'report.latitude';
  public isVehicleInvolved = 'report.isVehicleInvolved';
  public vehicleInvolvedDescription = 'report.vehicleInvolvedDescription';
  public isPeopleInvolved = 'report.isPeopleInvolved';
  public peopleInvolvedCount = 'report.peopleInvolvedCount';
  public causeOfFinished = 'report.causeOfFinished';
  public updateReportHere = 'report.updateReportHere';
  public status = 'report.status';
  public checkAllYourReports = 'report.checkAllYourReports';
  public updateReport = 'report.updateReport';
  public new = 'report.status.new';
  public inProgress = 'report.status.inProgress';
  public done = 'report.status.done';
  public expired = 'report.status.expired';

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

  private long: number;
  private lat: number;

  @select(s => s.report.error) reportStoreError;
  @select(s => s.report.selectedReport) selectedReport;
  @select(s => s.report.spinner) reportSpinner;
  @select(s => s.report) report$: Observable<IReportStore>;

  public session: ISession = JSON.parse(localStorage.getItem('session'));
  public Public = { _id: '', name: 'PUBLIC', accessLevel: 5, code: 'PUBLIC', description: '' }; // @TODO need to optimize in the future
  public _role: IRole = this.session && this.session.user ? this.session.user._role : this.Public;
  public isHost: boolean = (this._role.accessLevel === 2);
  public isPublic: boolean = (this._role.code === 'PUBLIC');
  public _report: string;
  private isDirty: boolean = false;
  public initialStatus: string;
  public statusDisabled: boolean = false;

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
        this._report = params._id;
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
      if (this.reportDetailForm && this.reportDetailForm.value.status !== this.initialStatus) this.isDirty = true;
      if (this.reportData && this.loadReportData) this.onLoadForm(this.reportData);
      if (this.successMessage) this.onSuccessMessage(this.successMessage);
      if (this.errorMessage) this.onErrorMessage(this.errorMessage);
  }

  ngOnChanges() {

  }

  canDeactivate(): Promise<boolean> | boolean {
    if (this.isDirty) {
      return swal({
        title: 'Do you want to discard changes?',
        text: 'Please click submit to save changes',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        return true;
      });
    }
    return true;
  }

  ngOnDestroy() {
    (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
    (this.reportSubscription) ? this.reportSubscription.unsubscribe() : null;
    (this.reportErrorSubscription) ? this.reportErrorSubscription.unsubscribe() : null;
  }

  setToDirty() {
    this.isDirty = true;
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
          status: this.isPublic ? [{ value: report.status, disabled: true }] : [report.status, Validators.required],
          createdAt: [{ value: report.createdAt, disabled: true }],
          dateReported: [{ value: report.dateReported, disabled: true }],
          _reporterUsername: [{ value: report._reporterUsername, disabled: true }],
          _teamName: [{ value: report._teamName, disabled: true }],
          generatedReportId: [{ value: report.generatedReportId, disabled: true }],
          causeOfFinished: [{ value: report.causeOfFinished, disabled: true }]
      });

      this.long = report.long;
      this.lat = report.lat;
      this.initialStatus = report.status;
      this.loadReportData = false;
      if (report.status.toLowerCase() === 'done' || report.status.toLowerCase() === 'expired') {
        this.statusDisabled = true;
      }
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
      this.isDirty = false;
      this.initialStatus = this.reportDetailForm.value.status;
      this.errorText = null;
      this.successText = null;
      const causeOfFinish = `${this.reportDetailForm.value.status}, ${this._role.code}`;
      this.reportActionCreator.UpdateReport(
        this.reportDetailForm.value._id,
        this.reportDetailForm.value.note,
        (this.reportDetailForm.value.status) ? this.reportDetailForm.value.status : 'Unresolved',
        causeOfFinish, true
      );
      this.reportErrorSubscription = this.report$
          .subscribe(
          (report: IReportStore) => {
              if (report.error) this.errorMessage = report.error;
              if (report.success) this.successMessage = report.success;
          }
      );
  }

  onBack() {
    this.actvatedRoute.params
    .subscribe(
      params => {
        if (params._hostId) {
          this.router.navigate([`${this._role.code.toLowerCase()}/host/report/${params._hostId}`]);
        } else {
          this.router.navigate([`${this._role.code.toLowerCase()}/report`]);
        }
      }
    );
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

  onLogin() {
		this.router.navigate(['/']);
	}
}
