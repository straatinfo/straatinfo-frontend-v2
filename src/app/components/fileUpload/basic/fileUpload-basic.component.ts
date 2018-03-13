import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Observable } from 'rxjs';
import { DialogService, SessionService } from '../../../services';
import { MiscActionCreator } from '../../../store/action-creators';

import { ISession } from '../../../interface/session/session.interface';

@Component({
  selector: 'app-fileUpload-basic',
  templateUrl: './fileUpload-basic.component.html',
  styleUrls: ['./fileUpload-basic.component.scss'],
})
export class FileUploadBasicComponent implements OnInit {

  @Input() fileAlias: string; // file alias must be the same in backend
  @Input() URL; // backend url address
  @Output() onErrorCallback = new EventEmitter<any>();
  @Output() onSuccessCallback = new EventEmitter<any>();

  private GetSessionToken(): string {
    const session: ISession = this.sessionService.SessionRead();
    if (!session) {
      return 'invalid token';
    } else {
      return session.token;
    }
  }

  private headers = new Headers();
  public uploader: FileUploader = new FileUploader({ url: this.URL, itemAlias: this.fileAlias });

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

    };
  }

  refresh(): void {
    window.location.reload();
  }

  constructor(
    private http: Http,
    private el: ElementRef,
    private dialogService: DialogService,
    private miscActionCreator: MiscActionCreator,
    private sessionService: SessionService
  ) { }

  getData(data) {
    return data.data;
  }

  upload() {
    this.miscActionCreator.LoadSpinner();
    this.headers.append('Access-Control-Allow-Origin', '*');
    //this.headers.append('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    //this.headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: this.headers });
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        formData.append(this.fileAlias, inputEl.files.item(i));
      }
      this.http
        .post(this.URL, formData, options)
        .map((res: any) => res.json())
        .map(data => this.getData(data))
        .subscribe(
          (result) => {
            this.onSuccessCallback.emit(result);
            this.miscActionCreator.FileUploadFulfilled(result);
            this.dialogService.showSwal('success-message', {
              title: 'Upload Success!',
              text: `Succeeded Entry`
            });
          },
          (error) => {
            this.onErrorCallback.emit(error);
            this.dialogService.showSwal('error-message', {
              title: 'Upload Failed.',
              text: `Sorry there was a problem encountered while uploading your file.`
            });
            this.miscActionCreator.UnloadSpinner();
          },
          () => { 
            this.miscActionCreator.UnloadSpinner();
          }
        );
    }
  }
}
