import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-team-dialog',
  templateUrl: './add-team-dialog.component.html',
  styleUrls: ['./add-team-dialog.component.scss']
})
export class AddTeamDialogComponent implements OnInit {
  public newTeamForm: FormGroup;
  public warning: string;
  constructor(
    public dialogRef: MatDialogRef<AddTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.newTeamForm = this.formBuilder.group({
      teamName: [null, Validators.required],
      teamEmail: [null, [Validators.email, Validators.required]],
      description: [null, Validators.required],
      isVolunteer: [this.data.reporter.isVolunteer === 'Non-Volunteer' ? false : true],
      creationMethod: ['WEBSITE']
    });
  }

  onBack() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.warning = null;
    if (this.newTeamForm.valid) {
      this.dialogRef.close(JSON.stringify(this.newTeamForm.value));
    } else {
      this.warning = 'Please complete the form';
    }
  }

}
