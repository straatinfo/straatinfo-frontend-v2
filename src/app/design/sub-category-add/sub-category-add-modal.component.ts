import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-sub-category-add-modal',
  templateUrl: './sub-category-add-modal.component.html',
  styleUrls: ['./sub-category-add-modal.component.scss']
})
export class SubCategoryAddModalComponent implements OnInit {

  public subCategoryAddForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SubCategoryAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.subCategoryAddForm = this.formBuilder.group({
      _mainCategory: [this.data._mainCategory, Validators.required],
      _mainCategoryName: [this.data._mainCategoryName],
      name: [null, Validators.required],
      dutch: [null, Validators.required],
      description: [null]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.subCategoryAddForm.valid) {
      this.dialogRef.close(`${JSON.stringify(this.subCategoryAddForm.value)}`);
    } else {
      this.dialogRef.close();
    }
  }

}
