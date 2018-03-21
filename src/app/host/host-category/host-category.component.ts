import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { CategoryActionCreator, HostActionCreator } from '../../store/action-creators';
import { ISession } from '../../interface/session/session.interface';
import { IMainCategoryView } from '../../interface/category/main-category-view.interface';
import { ISubCategoryView } from '../../interface/category/sub-category-view.interface';
import swal from 'sweetalert2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MainCategoryAddModalComponent, SubCategoryAddModalComponent } from '../../design';
import { IHostView } from '../../interface/host/host-view.interface';

@Component({
  selector: 'app-host-category',
  templateUrl: './host-category.component.html',
  styleUrls: ['./host-category.component.scss']
})

export class HostCategoryComponent implements OnInit, OnDestroy {

  public session: ISession = JSON.parse(localStorage.getItem('session'));
  @select(s => s.categoryMainA.categoryMainAs) mainCategories$: Observable<IMainCategoryView[]>;
  @select(s => s.categorySubA.categorySubAs) subCategories$: Observable<ISubCategoryView[]>;
  @select(s => s.categoryMainA.spinner) categorySpinner$: Observable<boolean>;
  @select(s => s.categorySubA.spinner) categorySubSpinner$: Observable<boolean>;
  @select(s => s.host.selectedHost) host$: Observable<IHostView>;

  public mainDataNames: string[] = [
    '_reportTypeCode', 'name'
  ];
  public mainDataAliases: string[] = [
    'Type', 'Name'
  ];
  public subDataNames: string[] = [
    '_mainCategoryName', 'name'
  ];
  public subDataAliases: string[] = [
    'Main', 'Name'
  ];
  public selectedMainCategoryId: string = null;
  public selectedMainCategoryName: string = null;

  private dialogRef: any;
  private dialogRefSubscription: Subscription = null;

  private routeSubscription: Subscription = null;
  private hostId: string = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryActionCreator: CategoryActionCreator,
    public dialog: MatDialog,
    private router: Router,
    private hostActionCreator: HostActionCreator
  ) { }

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.params
    .subscribe(
      params => {
        this.hostId = params._hostId;
        this.hostActionCreator.SelectHost(params._hostId);
        this.categoryActionCreator.GetHostMainCategory(params._hostId, 'A');
      }
    );
  }

  ngOnDestroy() {

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
    if (this.hostId) {
      this.dialogRef = this.dialog.open(MainCategoryAddModalComponent, {
        width: '500px',
        data: {code: 'A'}
      });
  
      this.dialogRefSubscription = this.dialogRef.afterClosed().subscribe(result => {
        const data = JSON.parse(result);
        this.categoryActionCreator.CreateMainCategoryA(this.hostId, {code: data.code, description: data.description, name: data.name}, true);
      });
    }
  }

  addSubCategory() {
    this.dialogRef = this.dialog.open(SubCategoryAddModalComponent, {
      width: '500px',
      data: { _mainCategory: this.selectedMainCategoryId, _mainCategoryName: this.selectedMainCategoryName }
    });

    this.dialogRefSubscription = this.dialogRef.afterClosed().subscribe(result => {
      const data = JSON.parse(result);
      
      this.categoryActionCreator.CreateSubCategoryA(data._mainCategory, {name: data.name, description: data.description});
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

  onBackToHost () {
    this.router.navigate(['/admin/host']);
  }

}
