import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { DesignActionCreator, CategoryActionCreator, ReportTypeActionCreator } from '../../store/action-creators';
import { IDesignCatogoryView } from 'app/interface/design/design-category-view.interface';
import { CategoryService, HostService } from '../../services';

import { BACKEND_URL } from '../../config';

@Component({
  selector: 'app-design-detail',
  templateUrl: './design-detail.component.html',
  styleUrls: ['./design-detail.component.scss']
})

export class DesignDetailComponent implements OnInit, OnDestroy {

  public categoryAForm: FormGroup;
  public categoryBForm: FormGroup;
  public categoryCForm: FormGroup;
  public categorySubAForm: FormGroup;

  public isCategoryAHidden = true;
  public isCategoryBHidden = true;
  public isCategoryCHidden = true;
  public isCategoryASubHidden = true;
  public isCategoryASubTableHidden = true;

  public mainCategoryAList = [];
  public selectedMainCategoryA: string;

  private hostId: string;
  private routeParamsSubscription: Subscription = null;
  private categoryAErrorSubscription: Subscription = null;
  private categoryBErrorSubscription: Subscription = null;
  private categoryCErrorSubscription: Subscription = null;
  private categorySubAErrorSubscription: Subscription = null;
  private categories = [];

  public errorText: string = null;
  public successText: string = null;  

  @select(s => s.categoryMainA.error) categoryMainAStoreError;
  @select(s => s.categoryMainA.categoryMainAs) categoryMainAs;
  @select(s => s.categoryMainA.spinner) categoryMainAsSpinner;

  @select(s => s.categoryMainB.error) categoryMainBStoreError;
  @select(s => s.categoryMainB.categoryMainBs) categoryMainBs;
  @select(s => s.categoryMainB.spinner) categoryMainBsSpinner;

  @select(s => s.categoryMainC.error) categoryMainCStoreError;
  @select(s => s.categoryMainC.categoryMainCs) categoryMainCs;
  @select(s => s.categoryMainC.spinner) categoryMainCsSpinner;

  @select(s => s.categorySubA.error) categorySubAStoreError;
  @select(s => s.categorySubA.categorySubAs) categorySubAs;
  @select(s => s.categorySubA.spinner) categorySubAsSpinner;

  @select(s => s.reportType.reportTypes) reportTypes;
  @select(s => s.table.page) page;

  public mainDataNames = [
      'name'
  ];
  public mainDataAliases = [
      'Main'
  ];

  public mainSubDataNames = [
      'mainCategoryName', 'name'
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

      this.categoryBForm = this.formBuilder.group({
          _id: [null, Validators.required],
          name: [null, Validators.required],
          description: [null, Validators.required],
          _reportType: [null, Validators.required],
      });

      this.categoryCForm = this.formBuilder.group({
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
                      this.categoryActionCreator.GetMainCategoryA(report._id);
                      this.categoryService.GetMainCategory(report._id).subscribe(dataCategory => {
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
                  else if (report.code == 'B') {
                      this.categoryBForm.setValue({
                          _id: null,
                          name: null,
                          description: null, 
                          _reportType: report._id
                      });
                      this.categoryActionCreator.GetMainCategoryB(report._id);
                  }
                  else if (report.code == 'C') {
                      this.categoryCForm.setValue({
                          _id: null,
                          name: null,
                          description: null,
                          _reportType: report._id
                      });
                      this.categoryActionCreator.GetMainCategoryC(report._id);
                  }
              });
          }
      });

      this.hostService.GetFreeHost().subscribe(val => {
          this.hostId = val._id;
      });   
  }

  ngOnDestroy() {
      (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
      (this.categoryAErrorSubscription) ? this.categoryAErrorSubscription.unsubscribe() : null;
      (this.categoryBErrorSubscription) ? this.categoryBErrorSubscription.unsubscribe() : null;
      (this.categoryCErrorSubscription) ? this.categoryCErrorSubscription.unsubscribe() : null;
      (this.categorySubAErrorSubscription) ? this.categorySubAErrorSubscription.unsubscribe() : null;  
  }

  onAddMainCategory(type: string) {

      this.errorText = null;
      this.successText = null;

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
      else if (type == 'reportB') {
          this.categoryBForm.setValue({
              _id: null,
              name: null,
              description: null,
              _reportType: this.categoryBForm.value._reportType
          });

          if (this.isCategoryBHidden)
              this.isCategoryBHidden = false;
          else
              this.isCategoryBHidden = true;
      }
      else if (type == 'reportC') {
          this.categoryCForm.setValue({
              _id: null,
              name: null,
              description: null,
              _reportType: this.categoryCForm.value._reportType
          });

          if (this.isCategoryCHidden)
              this.isCategoryCHidden = false;
          else 
              this.isCategoryCHidden = true;
         
      }
  }

  onAddSubCategory(type: string) {

      this.errorText = null;
      this.successText = null;

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

      this.errorText = null;
      this.successText = null;

      if (type == 'reportA') {

          this.categoryActionCreator.CreateMainCategoryA(this.hostId, this.categoryAForm.value)
          this.categoryAErrorSubscription = this.categoryMainAStoreError.subscribe(
              error => {
                  if (error) {
                      console.log(error);
                      this.errorText = error;
                  } else {
                      this.successText = 'The Main category has been saved.';
                      this.categoryActionCreator.GetMainCategoryA(this.categoryAForm.value._reportType);

                      this.categoryService.GetMainCategory(this.categoryAForm.value._reportType).subscribe(dataCategory => {
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
      else if (type == 'reportB') {

          this.categoryActionCreator.CreateMainCategoryB(this.hostId, this.categoryBForm.value)
          this.categoryBErrorSubscription = this.categoryMainBStoreError.subscribe(
              error => {
                  if (error) {
                      console.log(error);
                      this.errorText = error;
                  } else {
                      this.successText = 'The Main category has been saved.';
                      this.categoryActionCreator.GetMainCategoryB(this.categoryBForm.value._reportType);
                  }
              }
          );

      }
      else if (type == 'reportC') {

          this.categoryActionCreator.CreateMainCategoryC(this.hostId, this.categoryCForm.value)
          this.categoryCErrorSubscription = this.categoryMainCStoreError.subscribe(
              error => {
                  if (error) {
                      console.log(error);
                      this.errorText = error;
                  } else {
                      this.successText = 'The Main category has been saved.';
                      this.categoryActionCreator.GetMainCategoryC(this.categoryCForm.value._reportType);
                  }
              }
          );
      }
  }

  onSaveSubCategory(type: string) {

      this.errorText = null;
      this.successText = null;

      if (type == 'reportA') {
          this.categoryActionCreator.CreateSubCategoryA(this.selectedMainCategoryA, this.categorySubAForm.value);
          this.categorySubAErrorSubscription = this.categorySubAStoreError.subscribe(
              error => {
                  if (error) {
                      console.log(error);
                      this.errorText = error;
                  } else {
                      this.successText = 'The Sub category has been saved.';
                      this.categoryActionCreator.GetSubCategory(this.selectedMainCategoryA);
                  }
              }
          );
      }
  }

  onMoreCategoryAClick(event) {
      this.selectedMainCategoryA = event._id;
      this.categoryActionCreator.GetSubCategory(event._id);
      this.isCategoryASubTableHidden = false;
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

              this.categoryService.GetMainCategory(this.categoryAForm.value._reportType).subscribe(dataCategory => {
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

              this.isCategoryASubTableHidden = true;               
      });
  }

  onDeleteCategoryBClick(event) {
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
              this.categoryActionCreator.DeleteMainCategoryB(event._id);
              swal(
                  'Deleted!',
                  `${event.name} has been deleted.`,
                  'success'
              );
          }
          }).then(() => {

      });
  }

  onDeleteCategoryCClick(event) {
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
              this.categoryActionCreator.DeleteMainCategoryC(event._id);
              swal(
                  'Deleted!',
                  `${event.name} has been deleted.`,
                  'success'
              );
          }
      }).then(() => {

      });
  }

  onDeleteSubCategoryAClick(event) {
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
              this.categoryActionCreator.DeleteSubCategoryA(event._id);
              swal(
                  'Deleted!',
                  `${event.name} has been deleted.`,
                  'success'
              );
          }
      }).then(() => {
          this.categoryActionCreator.GetSubCategory(this.selectedMainCategoryA);
      });
  }
}