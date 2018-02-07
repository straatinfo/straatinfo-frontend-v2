import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

export interface IDialogOptions {
  title: string;
  text?: string;
}

@Injectable()
export class DialogService {

  showSwal(type: string, options: IDialogOptions) {
    const {
      title,
      text
    } = options;
    if (type === 'basic') {
      swal({
        title,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success'
      }).catch(swal.noop);
    } else if (type === 'title-and-text') {
      swal({
        title,
        text,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-info'
      }).catch(swal.noop);

    } else if (type === 'success-message') {
      swal({
        type: 'success',
        title,
        text,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success'
      }).catch(swal.noop);

    } else if (type == 'error-message') {
      swal({
        type: 'error',
        title,
        text,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-info'
      }).catch(swal.noop);
    }
  }
}
