import { Component, OnInit, Input, Output, EventEmitter, Inject, DoCheck } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TableActionCreator } from '../../../store/action-creators';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}


@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.scss']
})
export class TableBasicComponent implements OnInit {

  @Input() tableTitle:string;
  @Input() actionDelete: boolean;
  @Input() actionEdit: boolean;
  @Input() actionMore: boolean;
  @Input() actionViewDetail: boolean;
  @Input() paginator: boolean;
  @Input() currentPage: number;
  @Input() itemPerPage: number;
  @Input() tableDataArray: Observable<any[]>;
  @Input() tableHeaderName: Array<string>;
  @Input() tableHeaderAlias: Array<string>;
  @Output() clickEdit = new EventEmitter<any>();
  @Output() clickDelete = new EventEmitter<any>();
  @Output() clickMore = new EventEmitter<any>();

  public newTableDataArray:any[]; // page number
  // private itemPerPage:number = 5; // item per page
  public pagesToShow:number; // pages button between first and last
  public totalItem:number; // total number of item
  public sortBy: string;
  public sortName: string;

  constructor (
    private formBuilder: FormBuilder,
    private tableActionCreator: TableActionCreator
  ) {}

  ngOnInit () {
    this.tableDataArray
    .map(data => this.sorter(data, this.sortName, this.sortBy))
    .map(data => this.chunker(data, this.itemPerPage, this.currentPage))
    .subscribe(
      data => {
        this.newTableDataArray = data
      }
    );
  }

  chunker(data, itemPerPage, currentPage) {
    if (this.paginator) {
      const chunkedData = _.chunk(data, itemPerPage);
      this.pagesToShow = chunkedData.length;
      const dataToRender = chunkedData[currentPage];
      return dataToRender;
    } else {
      return data;
    }
  }

  ngDoCheck () {
    this.tableDataArray
    .map(data => this.sorter(data, this.sortName, this.sortBy))
    .map(data => this.chunker(data, this.itemPerPage, this.currentPage))
    .subscribe(
      data => {
        this.newTableDataArray = data
      }
    )
  }

  actionsEnabled (): boolean {
    return (this.actionDelete || this.actionEdit || this.actionMore) ? true : false;
  }

  onFirst() {
    this.currentPage = 0;
    this.tableActionCreator.UpatePage(this.currentPage);
  }

  onPrev() {
    if (this.currentPage !== 0){
      this.currentPage--;
      this.tableActionCreator.UpatePage(this.currentPage);
    }
  }

  onNext() {
    if ( this.currentPage >= (this.pagesToShow - 1)) {

    } else {
      this.currentPage++;
      this.tableActionCreator.UpatePage(this.currentPage);
    }
  }

  onLast() {
   this.currentPage = this.pagesToShow - 1;
   this.tableActionCreator.UpatePage(this.currentPage);
  }

  onEditClick (data) {
    this.clickEdit.emit(data);
  }

  onDeleteClick (data) {
    this.clickDelete.emit(data);
  }

  onMoreClick (data) {
    this.clickMore.emit(data);
  }

  sortAscending (headerName) {
    this.sortBy = 'asc';
    this.sortName = headerName;
  }

  sortDescending (headerName) {
    this.sortBy = 'desc';
    this.sortName = headerName;
  }

  sorter (data, sortName, sortBy) {
    console.log(sortName, sortBy);
    const sortedData = _.orderBy(data, sortName, sortBy);
    return sortedData;
  }

}
