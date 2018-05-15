import { Component, OnInit, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeamService } from '../../services';


@Component({
  selector: 'app-add-team-dialog',
  templateUrl: './add-team-dialog.component.html',
  styleUrls: ['./add-team-dialog.component.scss']
})
export class AddTeamDialogComponent implements OnInit {
  public newTeamForm: FormGroup;
  public warning: string;
  public isLoading: boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<AddTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.newTeamForm = this.formBuilder.group({
      teamName: [null, Validators.required],
      teamEmail: [null, [Validators.email, Validators.required]],
      description: ['    ', Validators.required],
      isVolunteer: [this.data.reporter.isVolunteer === 'Non-Volunteer' ? false : true],
      creationMethod: ['WEBSITE'],
      photo: null
    });
  }

  onBack() {
    this.dialogRef.close();
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file: File = event.target.files[0];
      this.newTeamForm.get('photo').setValue(file);
    }
  }

  clearFile() {
    this.newTeamForm.get('photo').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  private prepareSave(): any {
    let input = new FormData();
    this.newTeamForm.value.photo ? input.append('photo', this.newTeamForm.get('photo').value) : null;
    input.append('teamName', this.newTeamForm.get('teamName').value);
    input.append('teamEmail', this.newTeamForm.get('teamEmail').value);
    input.append('description', this.newTeamForm.get('description').value);
    input.append('isVolunteer', this.newTeamForm.get('isVolunteer').value);
    input.append('creationMethod', this.newTeamForm.get('creationMethod').value);
    return input;
  }

  onSubmit() {
    this.isLoading = true;
    this.warning = null;
    if (this.newTeamForm.valid) {
      this.teamService.CreateTeam(this.data.reporter._id, this.data.host._id, this.prepareSave())
      .subscribe(
        (team) => {
          this.dialogRef.close();
        }, err => {
          if (err && typeof(err) === 'string') {
            this.dialogRef.close(JSON.parse(err).message);
          } else {
            this.dialogRef.close('Internal Server Error');
          }
        }
      );
    } else {
      this.warning = 'Please complete the form';
    }
  }

}
