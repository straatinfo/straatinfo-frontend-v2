import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../app.store';
import {
REPORTER_CREATE_ATTEMPT,
REPORTER_CREATE_FAILED,
REPORTER_CREATE_FULFILLED,
REPORTER_DELETE_ATTEMPT,
REPORTER_DELETE_FAILED,
REPORTER_DELETE_FULFILLED,
REPORTER_GET_ATTEMPT,
REPORTER_GET_FAILED,
REPORTER_GET_FULFILLED,
REPORTER_SELECT_ATTEMPT,
REPORTER_SELECT_FAILED,
REPORTER_SELECT_FULFILLED,
REPORTER_UPDATE_ATTEMPT,
REPORTER_UPDATE_FAILED,
REPORTER_UPDATE_FULFILLED
} from '../actions/reporter.action';
import { Subscription } from 'rxjs/Subscription';
import { ReporterService } from '../../services';
import { IReporter } from '../../interface/reporter/reporter.interface';
import { IReporterView } from '../../interface/reporter/reporter-view.interface';


@Injectable()

export class ReporterActionCreator implements OnDestroy {

    private errorMessage: string;
    private getLatestReporterSubscription: Subscription = null;
    private updateReporterSubscription: Subscription = null;
    private deleteReporterSubscription: Subscription = null;
    private getReporterByIdSubscription: Subscription = null;
    private getOneReporterSubscription: Subscription = null;

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private reporterService: ReporterService
    ) { }

    ngOnDestroy() {
        (this.getLatestReporterSubscription) ? this.getLatestReporterSubscription.unsubscribe() : null;
        (this.updateReporterSubscription) ? this.updateReporterSubscription.unsubscribe() : null;
        (this.deleteReporterSubscription) ? this.deleteReporterSubscription.unsubscribe() : null;
        (this.getReporterByIdSubscription) ? this.getReporterByIdSubscription.unsubscribe() : null;
        (this.getOneReporterSubscription) ? this.getOneReporterSubscription.unsubscribe() : null;
    }

    GetLatestReporter() {
        this.ngRedux.dispatch({ type: REPORTER_GET_ATTEMPT });
        this.getLatestReporterSubscription = this.reporterService.GetLatestReporter()
            .map(data => {
                return data.map(d => this.ReporterListToView(d))
            })
            .subscribe(
            (reporters: IReporterView[]) => {
                this.ngRedux.dispatch({ type: REPORTER_GET_FULFILLED, payload: reporters });
            }, err => {
                this.errorMessage = err._body;
                if (this.errorMessage && typeof this.errorMessage === 'string') {
                    this.ngRedux.dispatch({ type: REPORTER_GET_FAILED, error: this.errorMessage });
                }
            },
            () => {
                this.errorMessage = null;
            }
            );
    }

    GetLatestReporterByHost(_hostId: string) {
        this.ngRedux.dispatch({ type: REPORTER_GET_ATTEMPT });
        this.getLatestReporterSubscription = this.reporterService.GetLatestReporterByHost(_hostId)
            .map(data => {
                return data.map(d => this.ReporterListToView(d))
            })
            .subscribe(
            (reporters: IReporterView[]) => {
                this.ngRedux.dispatch({ type: REPORTER_GET_FULFILLED, payload: reporters });
            }, err => {
                this.errorMessage = err._body;
                if (this.errorMessage && typeof this.errorMessage === 'string') {
                    this.ngRedux.dispatch({ type: REPORTER_GET_FAILED, error: this.errorMessage });
                }
            },
            () => {
                this.errorMessage = null;
            }
            );
    }

    BlockReporter(_id: string) {
        this.ngRedux.dispatch({ type: REPORTER_UPDATE_ATTEMPT });
        this.updateReporterSubscription = this.reporterService.BlockReporter(_id)
            .subscribe(
            (reporter: IReporter) => {
                this.ngRedux.dispatch({ type: REPORTER_UPDATE_FULFILLED, payload: reporter });
            }, err => {
                this.errorMessage = err._body;
                if (this.errorMessage && typeof this.errorMessage === 'string') {
                    this.ngRedux.dispatch({ type: REPORTER_UPDATE_FAILED, error: this.errorMessage });
                }
            },
            () => {
                this.errorMessage = null;
            }
            );
    }

    UnblockReporter(_id: string) {
        this.ngRedux.dispatch({ type: REPORTER_UPDATE_ATTEMPT });
        this.updateReporterSubscription = this.reporterService.UnblockReporter(_id)
            .subscribe(
            (reporter: IReporter) => {
                this.ngRedux.dispatch({ type: REPORTER_UPDATE_FULFILLED, payload: reporter });
            }, err => {
                this.errorMessage = err._body;
                if (this.errorMessage && typeof this.errorMessage === 'string') {
                    this.ngRedux.dispatch({ type: REPORTER_UPDATE_FAILED, error: this.errorMessage });
                }
            },
            () => {
                this.errorMessage = null;
            }
            );
    }

    DeleteReporter(_id: string, reporter: IReporterView) {
        this.ngRedux.dispatch({ type: REPORTER_DELETE_ATTEMPT });
        this.deleteReporterSubscription = this.reporterService.DeleteReporter(_id)
            .subscribe(
            data => {
                this.ngRedux.dispatch({ type: REPORTER_DELETE_FULFILLED, payload: reporter });
            }, err => {
                this.errorMessage = err._body;
                if (this.errorMessage && typeof this.errorMessage === 'string') {
                    this.ngRedux.dispatch({ type: REPORTER_GET_FAILED, error: this.errorMessage });
                }
            },
            () => {
                this.errorMessage = null;
            }
            );
    }
     
    GetReporterById(_id: string) {
        this.ngRedux.dispatch({ type: REPORTER_SELECT_ATTEMPT });
        this.getReporterByIdSubscription = this.reporterService.GetReporterById(_id)
            .map(data => this.ReporterListToView(data))
            .subscribe(
            (reporter: IReporterView) => {
                this.ngRedux.dispatch({ type: REPORTER_SELECT_FULFILLED, payload: reporter });
            }, err => {
                this.errorMessage = err._body;
                if (this.errorMessage && typeof this.errorMessage === 'string') {
                    this.ngRedux.dispatch({ type: REPORTER_GET_FAILED, error: this.errorMessage });
                }
            },
            () => {
                this.errorMessage = null;
            }
            );
    }

    SelectReporter(_id: string) {
        this.ngRedux.dispatch({ type: REPORTER_SELECT_ATTEMPT });
        this.getOneReporterSubscription = this.reporterService.GetReporterById(_id)
            .map(data => this.ReporterListToView(data))
            .subscribe(
            (reporter: IReporterView) => {
                this.ngRedux.dispatch({ type: REPORTER_SELECT_FULFILLED, payload: reporter });
            }, err => {
                this.errorMessage = err._body;
                if (this.errorMessage && typeof this.errorMessage === 'string') {
                    this.ngRedux.dispatch({ type: REPORTER_SELECT_FAILED, error: this.errorMessage });
                }
            },
            () => {
                this.errorMessage = null;
            }
            );
    }

    ResetSelectedReporter() {
        this.ngRedux.dispatch({ type: REPORTER_SELECT_FULFILLED, payload: null });
    }

    private ReporterListToView(data: IReporter): IReporterView {
        const reporter: IReporterView = {
            _id: data._id,
            isVolunteer: data.isVolunteer ? "Volunteer" : "Non-Volunteer",
            fname: data.fname,
            lname: data.lname,
            gender: data.gender,
            streetName: data.streetName,
            postalCode: data.postalCode,
            city: data.city,
            email: data.email,
            phoneNumber: data['_host.phoneNumber'], // <--- issue fbapp#112: phone number must be reporter's phonenumber
            status1: data.status1,
            status2: data.status2,
            dateRegistrationReporter: data.createdAt,
            dateCreationTeam: this.formatDate(data['activeTeam.createdAt']),
            hostId: data['_host._id'],
            hostName: data['_host.hostName'],
            activeTeamId: data['activeTeam._id'],
            activeTeamName: data['activeTeam.teamName'],
            activeTeamEmail: data['activeTeam.teamEmail'],
            pendingTeam: data['pendingTeam._id'],
            pendingTeamName: data['pendingTeam.teamName'],
            chatName: data.username,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            teamMembers: data.teamMembers,
            teamLeaders: data.teamLeaders
        };
        return reporter;
    }

    private ReporterToView(data: IReporter): IReporterView {
        const reporter: IReporterView = {
            _id: data._id,
            isVolunteer: data.isVolunteer ? "Volunteer" : "Non-Volunteer",
            fname: data.fname,
            lname: data.lname,
            gender: data.gender,
            streetName: data.streetName,
            postalCode: data.postalCode,
            city: data.city,
            email: data.email,
            phoneNumber: data._host.phoneNumber,
            status1: data.status1,
            status2: data.status2,
            dateRegistrationReporter: data.createdAt,
            dateCreationTeam: this.formatDate(data._activeTeam.createdAt),
            hostId: data._host._id,
            hostName: data._host.hostName,
            activeTeamId: data._activeTeam._id,
            activeTeamName: data._activeTeam.teamName,
            activeTeamEmail: data._activeTeam.teamEmail,   
            chatName: data.username,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
        return reporter;
    }

    private formatDate(data: Date): string {

        const date = new Date(data);
        const year = date.getFullYear().toString();
        const month = this.padLeft((date.getMonth() + 1).toString(), '0', 2);
        const day = this.padLeft(date.getDate().toString(), '0', 2);
        const hour = this.padLeft(date.getHours().toString(), '0', 2);
        const minutes = this.padLeft(date.getMinutes().toString(), '0', 2);
        const formattedDate = year + "/" + month + "/" + day + " " + hour + ":" + minutes;

        if (data == null)
            return "";

        return formattedDate;
    }

    private padLeft(text: string, padChar: string, size: number): string {
        return (String(padChar).repeat(size) + text).substr((size * -1), size);
    }
}
 
