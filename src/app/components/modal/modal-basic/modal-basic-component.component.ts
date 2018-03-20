import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-modal-basic-component',
  templateUrl: './modal-basic-component.component.html',
  styleUrls: ['./modal-basic-component.component.scss']
})
export class ModalBasicComponentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalBasicComponentComponent>
  ) { }

  ngOnInit() {
  }

}
