import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { HostActionCreator, TableActionCreator } from '../../store/action-creators';
import { ISession } from '../../interface/session/session.interface';
import { IUser } from '../../interface/user/user.interface';
import { IHostView } from '../../interface/host/host-view.interface';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-style';

@Component({
    selector: 'app-host-list',
    templateUrl: './host-list.component.html',
    styleUrls: ['./host-list.component.scss']
})
export class HostListComponent implements OnInit {

    private EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    private EXCEL_EXTENSION = '.xlsx';

    private hostSubscription: Subscription = null;

    @select(s => s.host.hosts) hosts;
    @select(s => s.table.page) page;
    @select(s => s.host.spinner) hostSpinner;

    public hostData = [];

    public dataNames = [
        'hostName', 'email', 'city', 'country', 'design'
    ];
    public dataAliases = [
        'Host Name', 'Email', 'City', 'Country', 'Design'
    ];

    constructor(
        private hostActionCreator: HostActionCreator,
        private router: Router,
        private tableActionCreator: TableActionCreator
    ) { }

    ngOnInit() {
        this.hostActionCreator.ResetSelectedHost();
        this.hostActionCreator.GetHosts();
        this.tableActionCreator.ResetPage();

        this.hostSubscription = this.hosts
            .subscribe(host => {
                this.hostData = host;
            });
    }

    onMoreClick(event) {
        this.hostActionCreator.SelectHost(event._id);
        this.router.navigate([`admin/host/${event._id}`]);
    }

    onDownload() {
        var mapData = [];
        this.hostData.map(d => mapData.push(this.HostData(d)));
        var fileName = 'Host';
        this.ExportAsExcelFile(mapData, fileName);
    }

    private HostData(data: IHostView): any {
        return {
            id: data._id || '',
            fname: data.fname || '',
            lname: data.lname,
            city: data.city || '',
            country: data.country || '',
            design: data.design || '',
            designType: data.designType || '',
            email: data.email || '',
            hostName: data.hostName || '',
            hostPersonalEmail: data.hostPersonalEmail || '',
            houseNumber: data.houseNumber || '',
            isBlocked: data.isBlocked || '',
            isPatron: data.isPatron || '',
            isSpecific: data.isSpecific || '',
            lat: data.lat || '',
            long: data.long || '',
            phoneNumber: data.phoneNumber || '',
            postalCode: data.postalCode || '',
            state: data.state || '',
            streetName: data.streetName || '',
            roleCode: data._roleCode || '',
            roleName: data._roleName || '',
        };
    }

    private HostHeader(): any {
        return {
            id: "Id",
            fname: "First Name",
            lname: "Last Name",
            city: 'City',
            country: 'Country',
            design: 'Design',
            designType: 'Design Type',
            email: 'Email',
            hostName: 'Host Name',
            hostPersonalEmail: 'Host Personal Email',
            houseNumber: 'House Number',
            isBlocked: 'Is Blocked',
            isPatron: 'Is Patron',
            isSpecific: 'Is Specific',
            lat: 'Latitude',
            long: 'Longtitude',
            phoneNumber: 'Phone Number',
            postalCode: 'Postal Code',
            state: 'State',
            streetName: 'Street Name',
            roleCode: 'Role Code',
            roleName: 'Role Name',
        };
    }

    private padLeft(text: string, padChar: string, size: number): string {
        return (String(padChar).repeat(size) + text).substr((size * -1), size);
    }

    private ExportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        this.WrapAndCenterCell(worksheet.B2);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        // Use XLSXStyle instead of XLSX write function which property writes cell styles.
        const excelBuffer: any = XLSXStyle.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.SaveAsExcelFile(excelBuffer, excelFileName);
    }

    private WrapAndCenterCell(cell: XLSX.CellObject) {
        const wrapAndCenterCellStyle = { alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } };
        this.SetCellStyle(cell, wrapAndCenterCellStyle);
    }

    private SetCellStyle(cell: XLSX.CellObject, style: {}) {
        cell.s = style;
    }

    private SaveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: this.EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
    }
}
