import { Component, OnInit, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {

  public changePasswordForm: FormGroup;
  public warningText: string = null;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      loginName: [this.data.email, Validators.required],
      email: [this.data.email, Validators.required],
      password: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmedPassword: [null, Validators.required]
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.changePasswordForm.valid
      && this.changePasswordForm.value.newPassword === this.changePasswordForm.value.confirmedPassword) {
        this.dialogRef.close(JSON.stringify(this.changePasswordForm.value));
    } else if (this.changePasswordForm.valid &&
      this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmedPassword) {
        this.warningText = 'New password and New password confirmation did not match.';
    } else {
      this.warningText = 'Please complete the form.';
    }
  }
}
