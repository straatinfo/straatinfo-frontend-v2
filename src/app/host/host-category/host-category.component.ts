import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { DesignActionCreator, CategoryActionCreator, ReportTypeActionCreator } from '../../store/action-creators';
import { IDesignView } from 'app/interface/design/design-view.interface';
import { CategoryService, HostService } from '../../services';

import { BACKEND_URL } from '../../config';

@Component({
  selector: 'app-host-category',
  templateUrl: './host-category.component.html',
  styleUrls: ['./host-category.component.scss']
})

export class HostCategoryComponent implements OnInit, OnDestroy {

  public categoryAForm: FormGroup;
  public categorySubAForm: FormGroup;

  public isCategoryAHidden = true;
  public isCategoryASubHidden = true;

  public mainCategoryAList = [];
  public selectedMainCategoryA: string;

  public hostName: string;
  private hostId: string;
  private routeParamsSubscription: Subscription = null;
  private categoryAErrorSubscription: Subscription = null;
  private hostSubscription: Subscription = null;
  private categories = [];

  public errorText: string = null;
  public successText: string = null;  

  @select(s => s.categoryMainA.error) categoryMainAStoreError;
  @select(s => s.categoryMainA.categoryMainAs) categoryMainAs;
  @select(s => s.categoryMainA.spinner) categoryMainAsSpinner;
  @select(s => s.reportType.reportTypes) reportTypes;
  @select(s => s.host.selectedHost) selectedHost;
  @select(s => s.table.page) page;

  public mainDataNames = [
      'name'
  ];
  public mainDataAliases = [
      'Main'
  ];

  public mainSubDataNames = [
      'name', 'sub'
  ];
  public mainSubDataAliases = [
      'Main', 'Sub'
  ];

  constructor(
    private actvatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryActionCreator: CategoryActionCreator,
    private reportTypeActionCreator: ReportTypeActionCreator,
    private categoryService: CategoryService,
    private hostService: HostService
  ) { }

  ngOnInit() {

      this.categoryAForm = this.formBuilder.group({
          _id: [null, Validators.required],
          name: [null, Validators.required],          
          description: [null, Validators.required],
          _reportType: [null, Validators.required],
      });

      this.categorySubAForm = this.formBuilder.group({
          _id: [null, Validators.required],
          name: [null, Validators.required],
          description: [null, Validators.required],
      });

      // Get report types
      this.reportTypeActionCreator.GetReportType();
      this.reportTypes.subscribe(data => {
          if (data != null) {
              data.forEach(report => {
                  if (report.code == 'A') {
                      this.categoryAForm.setValue({
                            _id: null,
                            name: null,
                            description: null,
                            _reportType: report._id
                      });                                                                             
                  }                 
              });
          }
      });

      this.routeParamsSubscription = this.actvatedRoute.params
          .subscribe(params => {
              this.hostId = params._hostId;  
              this.categoryActionCreator.GetHostMainCategory(this.hostId);
              this.categoryService.GetHostMainCategory(this.hostId).subscribe(dataCategory => {
                  if (dataCategory != null) {
                      this.categories = [];
                      dataCategory.forEach(category => {
                          var valueToPush = {};
                          valueToPush["value"] = category._id;
                          valueToPush["viewValue"] = category.name;
                          this.categories.push(valueToPush);
                      });
                      this.mainCategoryAList = this.categories;
                  }
              });  
                      
          });  

      this.hostSubscription = this.selectedHost
          .subscribe(host => {
              this.hostName = host.hostName;
          });            
  }

  ngOnDestroy() {
      (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
      (this.categoryAErrorSubscription) ? this.categoryAErrorSubscription.unsubscribe() : null;      
  }

  onBack() {
      this.router.navigate([`admin/host/${this.hostId}`]);
  }

  onAddMainCategory(type: string) {
      if (type == 'reportA') {
          this.categoryAForm.setValue({
              _id: null,
              name: null,
              description: null,
              _reportType: this.categoryAForm.value._reportType
          });

          this.isCategoryASubHidden = true;
          if (this.isCategoryAHidden)
              this.isCategoryAHidden = false;
          else
              this.isCategoryAHidden = true;
      }
  }

  onAddSubCategory(type: string) {
      if (type == 'reportA') {
          this.categorySubAForm.setValue({
              _id: null,
              name: null,
              description: null,
          });

          this.isCategoryAHidden = true;
          if (this.isCategoryASubHidden)
              this.isCategoryASubHidden = false;
          else
              this.isCategoryASubHidden = true;
      }
  }

  onSaveMainCategory(type: string) {

      if (type == 'reportA') {

          this.errorText = null;
          this.successText = null;
          this.categoryActionCreator.CreateMainCategoryA(this.hostId, this.categoryAForm.value)
          this.categoryAErrorSubscription = this.categoryMainAStoreError.subscribe(
              error => {
                  if (error) {
                      console.log(error);
                      this.errorText = error;
                  } else {
                      this.successText = 'The Main category has been saved.';
                      this.categoryActionCreator.GetHostMainCategory(this.hostId);
                      this.categoryService.GetHostMainCategory(this.hostId).subscribe(dataCategory => {
                          if (dataCategory != null) {
                              this.categories = [];
                              dataCategory.forEach(category => {
                                  var valueToPush = {};
                                  valueToPush["value"] = category._id;
                                  valueToPush["viewValue"] = category.name;
                                  this.categories.push(valueToPush);
                              });
                              this.mainCategoryAList = this.categories;
                          }
                      });
                  }
              }
          );
      }    
  }

  onSaveSubCategory(type: string) {
      if (type == 'reportA') {
          this.categoryActionCreator.CreateSubCategoryA(this.selectedMainCategoryA, this.categorySubAForm.value);
      }
  }

  onDeleteCategoryAClick(event) {
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
              this.categoryActionCreator.DeleteMainCategoryA(event._id);
              swal(
                  'Deleted!',
                  `${event.name} has been deleted.`,
                  'success'
              );
          }
          }).then(() => {
              this.categoryActionCreator.GetHostMainCategory(this.categoryAForm.value._reportType);
      });
  }
}