import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { DesignActionCreator, CategoryActionCreator, ReportTypeActionCreator } from '../../store/action-creators';
import { IDesignView } from 'app/interface/design/design-view.interface';

@Component({
  selector: 'app-design-detail',
  templateUrl: './design-detail.component.html',
  styleUrls: ['./design-detail.component.scss']
})

export class DesignDetailComponent implements OnInit, OnDestroy {

  public reportAForm: FormGroup;
  public reportBForm: FormGroup;
  public reportCForm: FormGroup;
  private routeParamsSubscription: Subscription = null;
  private designSubscription: Subscription = null;
  private categories = [];

  @select(s => s.category.categorys) categorys;
  @select(s => s.reportType.reportTypes) reportTypes;

  constructor(
    private actvatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private designActionCreator: DesignActionCreator,
    private categoryActionCreator: CategoryActionCreator,
    private reportTypeActionCreator: ReportTypeActionCreator
  ) { }

  ngOnInit() {
      
      this.categoryActionCreator.GetMainCategory();
      this.categorys.subscribe(data => {
          if (data != null)
          {
              data.forEach(item => {
                  var valueToPush = {};
                  valueToPush["value"] = item._id;
                  valueToPush["viewValue"] = item.name;
                  this.categories.push(valueToPush);
              });
          }
      });

      this.reportTypeActionCreator.GetReportType();

      this.reportAForm = this.formBuilder.group({
          _id: [null, Validators.required],
          mainCategory: [this.categories, Validators.required],
          mainCategoryId: [null, Validators.required],
          subCategory: [this.categories, Validators.required],
          subCategoryId: [null, Validators.required],
      });

      this.reportBForm = this.formBuilder.group({
          _id: [null, Validators.required],
          mainCategory: [this.categories, Validators.required],
          mainCategoryId: [null, Validators.required],
      });

      this.reportCForm = this.formBuilder.group({
          _id: [null, Validators.required],
          mainCategory: [this.categories, Validators.required],
          mainCategoryId: [null, Validators.required],
      });
  }

  ngOnDestroy() {
    (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
    (this.designSubscription) ? this.designSubscription.unsubscribe() : null;
  }

  onSave(type: string) {
      if (type == 'reportA') {
          //this.reportAForm.UpdateHost(this.reportAForm.value._id, this.reportAForm.value);
      }
      else if (type == 'reportB') {
          //this.reportAForm.UpdateHost(this.reportAForm.value._id, this.reportAForm.value);
      }
      else if (type == 'reportC') {
          //this.reportAForm.UpdateHost(this.reportAForm.value._id, this.reportAForm.value);
      }
  }

}
