import { SessionActionCreator } from './../../store/action-creators/session.actioncreator';
import { ChangePasswordDialogComponent } from './../change-password-dialog/change-password-dialog.component';
import { MatDialog } from '@angular/material';
import { CanDeactivate } from '@angular/router';
import { IUser } from './../../interface/user/user.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit, CanDeactivate<ViewProfileComponent>, OnDestroy {

  public user: IUser = JSON.parse(localStorage.getItem('session')).user;
  public isDirty: boolean = false;
  private dialogSubscription: Subscription = null;
  private dialogRef: any;
  public isLoading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private sessionActionCreator: SessionActionCreator
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dialogSubscription ? this.dialogSubscription.unsubscribe() : null;
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (this.isDirty) {
      return swal({
        title: 'Do you want to discard changes?',
        text: 'Please click update profile to save changes',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        return true;
      });
    }
    return true;
  }

  getChanges(event) {
    this.isDirty = event;
  }

  onChangePassword(event) {
    this.dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '500px',
      data: {email: event}
    });

    this.dialogSubscription = this.dialogRef.afterClosed()
    .subscribe(
      result => {
        if (result) {
          const changePassword = JSON.parse(result);
          this.isLoading = true;
          this.sessionActionCreator.ChangePassword(changePassword, (err, data) => {
            this.isLoading = false;
            if (err) {
              return swal('Change Password Error', err, 'error');
            }
            swal('Change Password Success', data, 'success');
          });
        }
      }
    );
  }

}
