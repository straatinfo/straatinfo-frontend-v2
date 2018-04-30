import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { CategoryActionCreator, LanguageActionCreator } from '../../store/action-creators';
import { ISession } from '../../interface/session/session.interface';
import { IMainCategoryView } from '../../interface/category/main-category-view.interface';
import { ISubCategoryView } from '../../interface/category/sub-category-view.interface';
import swal from 'sweetalert2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MainCategoryAddModalComponent } from '../main-category-add/main-category-add-modal.component';
import { SubCategoryAddModalComponent } from '../sub-category-add/sub-category-add-modal.component';

@Component({
  selector: 'app-report-type-a',
  templateUrl: './report-type-a.component.html',
  styleUrls: ['./report-type-a.component.scss']
})
export class ReportTypeAComponent implements OnInit {

  public session: ISession = JSON.parse(localStorage.getItem('session'));
  @select(s => s.categoryMainA.categoryMainAs) mainCategories$: Observable<IMainCategoryView[]>;
  @select(s => s.categorySubA.categorySubAs) subCategories$: Observable<ISubCategoryView[]>;
  @select(s => s.categoryMainA.spinner) categorySpinner$: Observable<boolean>;
  @select(s => s.categorySubA.spinner) categorySubSpinner$: Observable<boolean>;

  public mainDataNames: string[] = [
    '_reportTypeCode', 'name', 'dutch'
  ];
  public mainDataAliases: string[] = [
      'Type', 'Name', 'Dutch'
  ];
  public subDataNames: string[] = [
      '_mainCategoryName', 'name', 'dutch'
  ];
  public subDataAliases: string[] = [
      'Main', 'Name', 'Dutch'
  ];
  public selectedMainCategoryId: string = null;
  public selectedMainCategoryName: string = null;

  private dialogRef: any;
  private dialogRefSubscription: Subscription = null;

  constructor(
    private categoryActionCreator: CategoryActionCreator,
    private languageActionCreator: LanguageActionCreator,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.categoryActionCreator.GetGeneralMainCategory('A', true);
  }

  onMoreCategoryAClick(event) {
    this.categoryActionCreator.GetSubCategory(event._id);
    this.selectedMainCategoryId = event._id;
    this.selectedMainCategoryName = event.name;
  }

  onDeleteCategorAClick(event) {
    this.selectedMainCategoryId = null;
    this.selectedMainCategoryName = null;
    swal({
      title: 'Are you sure you want to delete this?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result) {
        this.categoryActionCreator.DeleteMainCategoryA(event._id, event);
      }
    })
    .catch((result) => {
      
    })
  }

  addMainCategory() {
    this.dialogRef = this.dialog.open(MainCategoryAddModalComponent, {
      width: '500px',
      data: {code: 'A'}
    });

    this.dialogRefSubscription = this.dialogRef.afterClosed().subscribe(result => {
      const data = JSON.parse(result);
      this.categoryActionCreator.CreateGeneralMainCategory(data, true);
      this.languageActionCreator.CreateLanguage(data.name, { code: 'nl', word: data.dutch });
    });
  }

  addSubCategory() {
    this.dialogRef = this.dialog.open(SubCategoryAddModalComponent, {
      width: '500px',
      data: { _mainCategory: this.selectedMainCategoryId, _mainCategoryName: this.selectedMainCategoryName }
    });

    this.dialogRefSubscription = this.dialogRef.afterClosed().subscribe(result => {
      const data = JSON.parse(result);      
      this.categoryActionCreator.CreateSubCategoryA(data._mainCategory, { name: data.name, description: data.description });
      this.languageActionCreator.CreateLanguage(data.name, { code: 'nl', word: data.dutch });
    });
  }

  onDeleteCategorySubClick(event) {
    swal({
      title: 'Are you sure you want to delete this?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result) {
        this.categoryActionCreator.DeleteSubCategoryA(event._id, event);
      }
    })
    .catch((result) => {
      
    })
  }


}
