import { Component, OnInit, ElementRef, Inject, OnDestroy  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reporter-team-option-dialog',
  templateUrl: './reporter-team-option-dialog.component.html',
  styleUrls: ['./reporter-team-option-dialog.component.scss']
})
export class ReporterTeamOptionDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReporterTeamOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

  }

  onClose() {
    this.dialogRef.close();
  }

  action(action: string) {
    const newData = {...this.data, action: action};
    this.dialogRef.close(JSON.stringify(newData));
  }

}
