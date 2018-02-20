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

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private reporterService: ReporterService
    ) { }

    ngOnDestroy() {
        (this.getLatestReporterSubscription) ? this.getLatestReporterSubscription.unsubscribe() : null;
        (this.updateReporterSubscription) ? this.updateReporterSubscription.unsubscribe() : null;
        (this.deleteReporterSubscription) ? this.deleteReporterSubscription.unsubscribe() : null;
        (this.getReporterByIdSubscription) ? this.getReporterByIdSubscription.unsubscribe() : null;
    }

    GetLatestReporter() {
        this.ngRedux.dispatch({ type: REPORTER_GET_ATTEMPT });
        this.getLatestReporterSubscription = this.reporterService.GetLatestReporter()
            .map(data => {
                return data.map(d => this.ReporterToView(d))
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
                return data.map(d => this.ReporterToView(d))
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

    GetReporterById(_id: string) {
        this.ngRedux.dispatch({ type: REPORTER_SELECT_ATTEMPT });
        this.getReporterByIdSubscription = this.reporterService.GetReporterById(_id)
            .map(data => this.ReporterToView(data))
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
        this.ngRedux.dispatch({ type: REPORTER_SELECT_FULFILLED, payload: _id });
    }

    private ReporterToView(data: IReporter): IReporterView {
        const reporter: IReporterView = {
            _id: data._id,
            fname: data.fname,
            lname: data.lname,
            isVolunteer: data.isVolunteer ? "volunteer" : "non-volunteer",
            status1: data.status1,
            status2: data.status2,
            _host: data['_host.hostName'],
            _chat: data['username'],
            _team: data['_team.name'],
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
        return reporter;
    }
}
 