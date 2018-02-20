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

  public mainCategoryAList = [];
  public selectedMainCategoryA: string;

  private hostId: string;
  private routeParamsSubscription: Subscription = null;
  private categories = [];

  @select(s => s.categoryMainA.categoryMainAs) categoryMainAs;
  @select(s => s.categoryMainA.spinner) categoryMainAsSpinner;

  @select(s => s.categoryMainB.categoryMainBs) categoryMainBs;
  @select(s => s.categoryMainB.spinner) categoryMainBsSpinner;

  @select(s => s.categoryMainC.categoryMainCs) categoryMainCs;
  @select(s => s.categoryMainC.spinner) categoryMainCsSpinner;

  @select(s => s.reportType.reportTypes) reportTypes;

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
          this.categoryService.CreateMainCategory(this.hostId, this.categoryAForm.value).subscribe(val => {

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
          });
      }
      else if (type == 'reportB') {

          this.categoryService.CreateMainCategory(this.hostId, this.categoryBForm.value).subscribe(val => {
              this.categoryActionCreator.GetMainCategoryB(this.categoryBForm.value._reportType);              
          });

      }
      else if (type == 'reportC') {

          this.categoryService.CreateMainCategory(this.hostId, this.categoryCForm.value).subscribe(val => {
              this.categoryActionCreator.GetMainCategoryC(this.categoryCForm.value._reportType);
          });

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
              this.categoryActionCreator.GetMainCategoryA(this.categoryAForm.value._reportType);
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
          this.categoryActionCreator.GetMainCategoryB(this.categoryBForm.value._reportType);
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
          this.categoryActionCreator.GetMainCategoryC(this.categoryCForm.value._reportType);
      });
  }
}