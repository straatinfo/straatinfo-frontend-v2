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
  selector: 'app-report-type-b',
  templateUrl: './report-type-b.component.html',
  styleUrls: ['./report-type-b.component.scss']
})
export class ReportTypeBComponent implements OnInit {

  public session: ISession = JSON.parse(localStorage.getItem('session'));
  @select(s => s.categoryMainB.categoryMainBs) mainCategories$: Observable<IMainCategoryView[]>;
  @select(s => s.categoryMainB.spinner) categorySpinner$: Observable<boolean>;

  public mainDataNames: string[] = [
    '_reportTypeCode', 'name'
  ];
  public mainDataAliases: string[] = [
    'Type', 'Name'
  ];

  private dialogRef: any;
  private dialogRefSubscription: Subscription = null;

  constructor(
    private categoryActionCreator: CategoryActionCreator,
    private languageActionCreator: LanguageActionCreator,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.categoryActionCreator.GetGeneralMainCategory('B', true);
  }

  onDeleteCategorBClick(event) {
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
        this.categoryActionCreator.DeleteMainCategoryB(event._id, event);
      }
    })
    .catch((result) => {
      
    })
  }

  addMainCategory() {
    this.dialogRef = this.dialog.open(MainCategoryAddModalComponent, {
      width: '500px',
      data: {code: 'B'}
    });

    this.dialogRefSubscription = this.dialogRef.afterClosed().subscribe(result => {
      const data = JSON.parse(result);
      this.categoryActionCreator.CreateGeneralMainCategory(data, true);
      this.languageActionCreator.CreateLanguage(data.name, { code: 'nl', word: data.dutch });
    });
  }

}
