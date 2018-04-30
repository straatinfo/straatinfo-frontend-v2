import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-category-add-modal',
  templateUrl: './main-category-add-modal.component.html',
  styleUrls: ['./main-category-add-modal.component.scss']
})
export class MainCategoryAddModalComponent implements OnInit {

  public mainCategoryAddForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MainCategoryAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.mainCategoryAddForm = this.formBuilder.group({
      code: [this.data.code, Validators.required],
      name: [null, Validators.required],
      dutch: [null, Validators.required],
      description: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.mainCategoryAddForm.valid) {
      this.dialogRef.close(`${JSON.stringify(this.mainCategoryAddForm.value)}`);
    } else {
      this.dialogRef.close();
    }
  }

}
