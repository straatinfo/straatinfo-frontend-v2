import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { IAppState } from '../app.store';
import { CategoryService, DialogService } from '../../services';
import { IMainCategory } from '../../interface/category/main-category.interface';
import { IMainCategoryView } from '../../interface/category/main-category-view.interface';
import { ISubCategory } from '../../interface/category/sub-category.interface';
import { ISubCategoryView } from '../../interface/category/sub-category-view.interface';

import {
	CATEGORYMAIN_A_CREATE_ATTEMPT,
	CATEGORYMAIN_A_CREATE_FAILED,
	CATEGORYMAIN_A_CREATE_FULFILLED,
	CATEGORYMAIN_A_DELETE_ATTEMPT,
	CATEGORYMAIN_A_DELETE_FAILED,
	CATEGORYMAIN_A_DELETE_FULFILLED,
	CATEGORYMAIN_A_GET_ATTEMPT,
	CATEGORYMAIN_A_GET_FAILED,
	CATEGORYMAIN_A_GET_FULFILLED,
	CATEGORYMAIN_A_UPDATE_ATTEMPT,
	CATEGORYMAIN_A_UPDATE_FAILED,
	CATEGORYMAIN_A_UPDATE_FULFILLED,
	CATEGORYMAIN_A_SELECT_FULFILLED,
	CATEGORYMAIN_A_SELECT_FAILED,
	CATEGORYMAIN_A_SELECT_ATTEMPT
} from '../actions/categoryMainA.action';

import {
	CATEGORYMAIN_B_CREATE_ATTEMPT,
	CATEGORYMAIN_B_CREATE_FAILED,
	CATEGORYMAIN_B_CREATE_FULFILLED,
	CATEGORYMAIN_B_DELETE_ATTEMPT,
	CATEGORYMAIN_B_DELETE_FAILED,
	CATEGORYMAIN_B_DELETE_FULFILLED,
	CATEGORYMAIN_B_GET_ATTEMPT,
	CATEGORYMAIN_B_GET_FAILED,
	CATEGORYMAIN_B_GET_FULFILLED,
	CATEGORYMAIN_B_UPDATE_ATTEMPT,
	CATEGORYMAIN_B_UPDATE_FAILED,
	CATEGORYMAIN_B_UPDATE_FULFILLED,
	CATEGORYMAIN_B_SELECT_FULFILLED,
	CATEGORYMAIN_B_SELECT_FAILED,
	CATEGORYMAIN_B_SELECT_ATTEMPT
} from '../actions/categoryMainB.action';

import {
	CATEGORYMAIN_C_CREATE_ATTEMPT,
	CATEGORYMAIN_C_CREATE_FAILED,
	CATEGORYMAIN_C_CREATE_FULFILLED,
	CATEGORYMAIN_C_DELETE_ATTEMPT,
	CATEGORYMAIN_C_DELETE_FAILED,
	CATEGORYMAIN_C_DELETE_FULFILLED,
	CATEGORYMAIN_C_GET_ATTEMPT,
	CATEGORYMAIN_C_GET_FAILED,
	CATEGORYMAIN_C_GET_FULFILLED,
	CATEGORYMAIN_C_UPDATE_ATTEMPT,
	CATEGORYMAIN_C_UPDATE_FAILED,
	CATEGORYMAIN_C_UPDATE_FULFILLED,
	CATEGORYMAIN_C_SELECT_FULFILLED,
	CATEGORYMAIN_C_SELECT_FAILED,
	CATEGORYMAIN_C_SELECT_ATTEMPT
} from '../actions/categoryMainC.action';

import {
	CATEGORYSUB_A_CREATE_ATTEMPT,
	CATEGORYSUB_A_CREATE_FAILED,
	CATEGORYSUB_A_CREATE_FULFILLED,
	CATEGORYSUB_A_DELETE_ATTEMPT,
	CATEGORYSUB_A_DELETE_FAILED,
	CATEGORYSUB_A_DELETE_FULFILLED,
	CATEGORYSUB_A_GET_ATTEMPT,
	CATEGORYSUB_A_GET_FAILED,
	CATEGORYSUB_A_GET_FULFILLED,
	CATEGORYSUB_A_UPDATE_ATTEMPT,
	CATEGORYSUB_A_UPDATE_FAILED,
	CATEGORYSUB_A_UPDATE_FULFILLED,
	CATEGORYSUB_A_SELECT_FULFILLED,
	CATEGORYSUB_A_SELECT_FAILED,
	CATEGORYSUB_A_SELECT_ATTEMPT,
	CATEGORYSUB_A_EMPTY
} from '../actions/categorySubA.action';
import { IMainCategoryCreate } from '../../interface/category/main-category-create.interface';

@Injectable()

export class CategoryActionCreator implements OnDestroy {

	private errorMessage: string;
	private getCategorySubscription: Subscription = null;
	private updateCategorySubscription: Subscription = null;
	private crateMainCategorySubscription: Subscription = null;
	private getMainCategorySubscription: Subscription = null;

	constructor(
		private ngRedux: NgRedux<IAppState>,
		private router: Router,
		private categoryService: CategoryService,
		private dialogService: DialogService
	) { }

	ngOnDestroy() {
		(this.getCategorySubscription) ? this.getCategorySubscription.unsubscribe() : null;
		(this.updateCategorySubscription) ? this.updateCategorySubscription.unsubscribe() : null;
		(this.crateMainCategorySubscription) ? this.crateMainCategorySubscription.unsubscribe() : null;
		(this.getMainCategorySubscription) ? this.getMainCategorySubscription.unsubscribe() : null;
	}

	GetHostMainCategory(hostId: string, code: string = 'A') {
		this.ngRedux.dispatch({ type: CATEGORYMAIN_A_GET_ATTEMPT });
		this.getCategorySubscription = this.categoryService.GetHostMainCategory(hostId, code)
            .map((data: any[]) => { return data.map(d => this.ToMainCategoryView(d)); })
            .map((data: IMainCategoryView[]) => {

                var overige = _.remove(data, function (item) {
                    return item.name.toUpperCase() === 'overige'.toUpperCase();
                });
                var orderedList = _.orderBy(data, [x => x.name.toLowerCase()], ['asc']);
                var items = _.union(orderedList, overige);

                return items;
            })
			.subscribe(
				(category: IMainCategoryView[]) => {
					this.ngRedux.dispatch({ type: CATEGORYMAIN_A_GET_FULFILLED, payload: category });
				}, err => {
					this.errorMessage = err._body;
					if (this.errorMessage && typeof this.errorMessage === 'string') {
						this.ngRedux.dispatch({ type: CATEGORYMAIN_A_GET_FAILED, error: this.errorMessage });
					}
				},
				() => {
					this.errorMessage = null;
				}
			);
	}

	GetSubCategory(mainCategoryId: string) {
		this.ngRedux.dispatch({ type: CATEGORYSUB_A_GET_ATTEMPT });
		this.getCategorySubscription = this.categoryService.GetSubCategory(mainCategoryId)
            .map((data: any[]) => { return data.map(d => this.ToSubCategoryView(d)); })
            .map((data: ISubCategoryView[]) => {

                var overige = _.remove(data, function (item) {
                    return item.name.toUpperCase() === 'overige'.toUpperCase();
                });
                var orderedList = _.orderBy(data, [x => x.name.toLowerCase()], ['asc']);
                var items = _.union(orderedList, overige);

                return items;
            })
			.subscribe(
				(category: ISubCategoryView[]) => {
					this.ngRedux.dispatch({ type: CATEGORYSUB_A_GET_FULFILLED, payload: category });
				}, err => {
					this.errorMessage = err._body;
					if (this.errorMessage && typeof this.errorMessage === 'string') {
						this.ngRedux.dispatch({ type: CATEGORYSUB_A_GET_FAILED, error: this.errorMessage });
					}
				},
				() => {
					this.errorMessage = null;
				}
			);
	}

	GetMainCategoryA(reportTypeId: string) {
		this.ngRedux.dispatch({ type: CATEGORYMAIN_A_GET_ATTEMPT });
		this.getCategorySubscription = this.categoryService.GetMainCategory(reportTypeId)
            .map((data: any[]) => { return data.map(d => this.ToMainCategoryView(d)); })
            .map((data: IMainCategoryView[]) => {

                var overige = _.remove(data, function (item) {
                    return item.name.toUpperCase() === 'overige'.toUpperCase();
                });
                var orderedList = _.orderBy(data, [x => x.name.toLowerCase()], ['asc']);
                var items = _.union(orderedList, overige);

                return items;
            })
			.subscribe(
				(category: IMainCategoryView[]) => {
					this.ngRedux.dispatch({ type: CATEGORYMAIN_A_GET_FULFILLED, payload: category });
				}, err => {
					this.errorMessage = err._body;
					if (this.errorMessage && typeof this.errorMessage === 'string') {
						this.ngRedux.dispatch({ type: CATEGORYMAIN_A_GET_FAILED, error: this.errorMessage });
					}
				},
				() => {
					this.errorMessage = null;
				}
			);
	}

	GetMainCategoryB(reportTypeId: string) {
		this.ngRedux.dispatch({ type: CATEGORYMAIN_B_GET_ATTEMPT });
		this.getCategorySubscription = this.categoryService.GetMainCategory(reportTypeId)
            .map((data: any[]) => { return data.map(d => this.ToMainCategoryView(d)); })
            .map((data: IMainCategoryView[]) => {

                var overige = _.remove(data, function (item) {
                    return item.name.toUpperCase() === 'overige'.toUpperCase();
                });
                var orderedList = _.orderBy(data, [x => x.name.toLowerCase()], ['asc']);
                var items = _.union(orderedList, overige);

                return items;
            })
			.subscribe(
				(category: IMainCategoryView[]) => {
					this.ngRedux.dispatch({ type: CATEGORYMAIN_B_GET_FULFILLED, payload: category });
				}, err => {
					this.errorMessage = err._body;
					if (this.errorMessage && typeof this.errorMessage === 'string') {
						this.ngRedux.dispatch({ type: CATEGORYMAIN_B_GET_FAILED, error: this.errorMessage });
					}
				},
				() => {
					this.errorMessage = null;
				}
			);
	}

	GetMainCategoryC(reportTypeId: string) {
		this.ngRedux.dispatch({ type: CATEGORYMAIN_C_GET_ATTEMPT });
		this.getCategorySubscription = this.categoryService.GetMainCategory(reportTypeId)
            .map((data: any[]) => { return data.map(d => this.ToMainCategoryView(d)); })
            .map((data: IMainCategoryView[]) => {
                
                var overige = _.remove(data, function (item) {
                    return item.name.toUpperCase() === 'overige'.toUpperCase();
                });
                var orderedList = _.orderBy(data, [x => x.name.toLowerCase()], ['asc']);
                var items = _.union(orderedList, overige);

                return items;
            })
			.subscribe(
				(category: IMainCategoryView[]) => {
					this.ngRedux.dispatch({ type: CATEGORYMAIN_C_GET_FULFILLED, payload: category });
				}, err => {
					this.errorMessage = err._body;
					if (this.errorMessage && typeof this.errorMessage === 'string') {
						this.ngRedux.dispatch({ type: CATEGORYMAIN_C_GET_FAILED, error: this.errorMessage });
					}
				},
				() => {
					this.errorMessage = null;
				}
			);
	}

	DeleteMainCategoryA(_id: string, mainCategory: IMainCategoryView) {
		this.ngRedux.dispatch({ type: CATEGORYMAIN_A_DELETE_ATTEMPT });
		this.updateCategorySubscription = this.categoryService.DeleteMainCategory(_id)
			.subscribe(
				data => {
					this.ngRedux.dispatch({ type: CATEGORYMAIN_A_DELETE_FULFILLED, payload: mainCategory });
				}, err => {
					this.errorMessage = err._body;
					if (this.errorMessage && typeof this.errorMessage === 'string') {
						this.ngRedux.dispatch({ type: CATEGORYMAIN_A_GET_FAILED, error: this.errorMessage });
					}
				},
				() => {
					this.errorMessage = null;
					this.ngRedux.dispatch({ type: CATEGORYSUB_A_EMPTY, payload: null });
				}
			);
	}

	DeleteMainCategoryB(_id: string, _mainCategory: IMainCategoryView) {
		this.ngRedux.dispatch({ type: CATEGORYMAIN_B_DELETE_ATTEMPT });
		this.updateCategorySubscription = this.categoryService.DeleteMainCategory(_id)
			.subscribe(
				data => {
					this.ngRedux.dispatch({ type: CATEGORYMAIN_B_DELETE_FULFILLED, payload: _mainCategory });
				}, err => {
					this.errorMessage = err._body;
					if (this.errorMessage && typeof this.errorMessage === 'string') {
						this.ngRedux.dispatch({ type: CATEGORYMAIN_B_GET_FAILED, error: this.errorMessage });
					}
				},
				() => {
					this.errorMessage = null;
				}
			);
	}

	DeleteMainCategoryC(_id: string, _mainCategory: IMainCategoryView) {
		this.ngRedux.dispatch({ type: CATEGORYMAIN_C_DELETE_ATTEMPT });
		this.updateCategorySubscription = this.categoryService.DeleteMainCategory(_id)
			.subscribe(
				data => {
					this.ngRedux.dispatch({ type: CATEGORYMAIN_C_DELETE_FULFILLED, payload: _mainCategory });
				}, err => {
					this.errorMessage = err._body;
					if (this.errorMessage && typeof this.errorMessage === 'string') {
						this.ngRedux.dispatch({ type: CATEGORYMAIN_C_GET_FAILED, error: this.errorMessage });
					}
				},
				() => {
					this.errorMessage = null;
				}
			);
	}

	DeleteSubCategoryA(_id: string, subCategory: ISubCategoryView) {
		this.ngRedux.dispatch({ type: CATEGORYSUB_A_DELETE_ATTEMPT });
		this.updateCategorySubscription = this.categoryService.DeleteSubCategory(_id)
			.subscribe(
				data => {
					this.ngRedux.dispatch({ type: CATEGORYSUB_A_DELETE_FULFILLED, payload: subCategory });
				}, err => {
					this.errorMessage = err._body;
					if (this.errorMessage && typeof this.errorMessage === 'string') {
						this.ngRedux.dispatch({ type: CATEGORYSUB_A_GET_FAILED, error: this.errorMessage });
					}
				},
				() => {
					this.errorMessage = null;
				}
			);
	}

	CreateMainCategoryA(_host: string, category: IMainCategoryCreate, flat: boolean = true) {
		this.ngRedux.dispatch({ type: CATEGORYMAIN_A_CREATE_ATTEMPT });
		this.updateCategorySubscription = this.categoryService.CreateMainCategory(_host, category, flat)
            .map(data => this.ToMainCategoryView(data))
			.subscribe(
				(category: IMainCategoryView) => {
                    this.GetHostMainCategory(_host, category._reportTypeCode);
				}, err => {
					this.errorMessage = err._body;
					if (this.errorMessage && typeof this.errorMessage === 'string') {
						this.ngRedux.dispatch({ type: CATEGORYMAIN_A_CREATE_FAILED, error: this.errorMessage });
					}
				},
				() => {
					this.errorMessage = null;
				}
			);
	}

	CreateMainCategoryB(_id: string, category: IMainCategoryCreate) {
		this.ngRedux.dispatch({ type: CATEGORYMAIN_B_CREATE_ATTEMPT });
		this.updateCategorySubscription = this.categoryService.CreateMainCategory(_id, category)
            .map(data => this.ToMainCategoryView(data))
			.subscribe(
				(category: IMainCategoryView) => {
					this.ngRedux.dispatch({ type: CATEGORYMAIN_B_CREATE_FULFILLED, payload: category });
				}, err => {
					this.errorMessage = err._body;
					if (this.errorMessage && typeof this.errorMessage === 'string') {
						this.ngRedux.dispatch({ type: CATEGORYMAIN_B_CREATE_FAILED, error: this.errorMessage });
					}
				},
				() => {
					this.errorMessage = null;
				}
			);
	}

	CreateMainCategoryC(_id: string, category: IMainCategoryCreate) {
		this.ngRedux.dispatch({ type: CATEGORYMAIN_C_CREATE_ATTEMPT });
		this.updateCategorySubscription = this.categoryService.CreateMainCategory(_id, category)
            .map(data => this.ToMainCategoryView(data))
			.subscribe(
				(category: IMainCategoryView) => {
					this.ngRedux.dispatch({ type: CATEGORYMAIN_C_CREATE_FULFILLED, payload: category });
				}, err => {
					this.errorMessage = err._body;
					if (this.errorMessage && typeof this.errorMessage === 'string') {
						this.ngRedux.dispatch({ type: CATEGORYMAIN_C_CREATE_FAILED, error: this.errorMessage });
					}
				},
				() => {
					this.errorMessage = null;
				}
			);
	}

	CreateSubCategoryA(_mainCategoryId: string, category: ISubCategoryView) {
		this.ngRedux.dispatch({ type: CATEGORYSUB_A_CREATE_ATTEMPT });
		this.updateCategorySubscription = this.categoryService.CreateSubCategory(_mainCategoryId, category)
            .map(data => this.ToSubCategoryView(data))
			.subscribe(
				(category: ISubCategoryView) => {
					this.ngRedux.dispatch({ type: CATEGORYSUB_A_CREATE_FULFILLED, payload: category });
				}, err => {
					this.errorMessage = err._body;
					if (this.errorMessage && typeof this.errorMessage === 'string') {
						this.ngRedux.dispatch({ type: CATEGORYSUB_A_CREATE_FAILED, error: this.errorMessage });
					}
				},
				() => {
                    this.errorMessage = null;
                    this.GetSubCategory(_mainCategoryId);
				}
			);
	}

	CreateGeneralMainCategory({code, name, description}: IMainCategoryCreate, flat: boolean = true) {
		const CODE = code.toUpperCase();
		const action = {
			'A': {attempt: CATEGORYMAIN_A_CREATE_ATTEMPT, fulfilled: CATEGORYMAIN_A_CREATE_FULFILLED, failed: CATEGORYMAIN_A_CREATE_FAILED },
			'B': {attempt: CATEGORYMAIN_B_CREATE_ATTEMPT, fulfilled: CATEGORYMAIN_B_CREATE_FULFILLED, failed: CATEGORYMAIN_B_CREATE_FULFILLED},
			'C': {attempt: CATEGORYMAIN_C_CREATE_ATTEMPT, fulfilled: CATEGORYMAIN_C_CREATE_FULFILLED, failed: CATEGORYMAIN_C_CREATE_FAILED}
		};
		this.ngRedux.dispatch({ type: action[CODE].attempt });
		this.crateMainCategorySubscription = this.categoryService.CreateGeneralMainCategory({code, name, description}, flat)
            .map(data => this.ToMainCategoryView(data))	
			.subscribe(
				(mainCategory: IMainCategoryView) => {
                    this.GetGeneralMainCategory(CODE, true)
					this.dialogService.showSwal('success-message', {title: 'Main Category Created', text: 'Main Category has Successfully created'});
				}, err => {
					this.errorMessage = err._body;
					if (this.errorMessage && typeof this.errorMessage === 'string') {
						this.ngRedux.dispatch({ type: action[CODE].failed, error: this.errorMessage });
						this.dialogService.showSwal('error-message', {title: 'Main Category Failed To Create', text: 'There was an unexpected error, please try again.'});
					}
				},
				() => {
					this.errorMessage = null;
				}
			);
	} 

	GetGeneralMainCategory (code: string, flat: boolean = true) {
		const CODE = code.toUpperCase();
		const action = {
			'A': {attempt: CATEGORYMAIN_A_GET_ATTEMPT, fulfilled: CATEGORYMAIN_A_GET_FULFILLED, failed: CATEGORYMAIN_A_GET_FAILED },
			'B': {attempt: CATEGORYMAIN_B_GET_ATTEMPT, fulfilled: CATEGORYMAIN_B_GET_FULFILLED, failed: CATEGORYMAIN_B_GET_FULFILLED},
			'C': {attempt: CATEGORYMAIN_C_GET_ATTEMPT, fulfilled: CATEGORYMAIN_C_GET_FULFILLED, failed: CATEGORYMAIN_C_GET_FAILED}
		};
		this.ngRedux.dispatch({ type: action[CODE].attempt });
		this.getMainCategorySubscription = this.categoryService.GetGeneralMainCategory(code, flat)
            .map((data: any[]) => { return data.map(d => this.ToMainCategoryView(d)); })
            .map((data: IMainCategoryView[]) => {
                
                var overige = _.remove(data, function (item) {
                    return item.name.toUpperCase() === 'overige'.toUpperCase();
                });
                var orderedList = _.orderBy(data, [x => x.name.toLowerCase()], ['asc']);
                var items = _.union(orderedList, overige);

                return items;
            })

		.subscribe(
			(mainCategories: IMainCategoryView[]) => {
				this.ngRedux.dispatch({ type: action[CODE].fulfilled, payload: mainCategories });
			}, err => {
				this.errorMessage = err._body;
				if (this.errorMessage && typeof this.errorMessage === 'string') {
					this.ngRedux.dispatch({ type: action[CODE].failed, error: this.errorMessage });
				}
			},
			() => {
				this.errorMessage = null;
			}
		);
	}

	private ToMainCategoryView(data: IMainCategory): IMainCategoryView {
		return {
			_id: data._id,
			name: data.name,
			description: data.description,
			_reportType: data['_reportType._id'],
			_reportTypeCode: data['_reportType.code'],
			_reportTypeName: data['_reportType.name'],
			_host: data['_host._id'],
			_hostName: data['_host.hostName']
		};
	}

	private ToSubCategoryView(data: ISubCategory): ISubCategoryView {
		return {
			_id: data._id,
			name: data.name,
			description: data.description,
			_mainCategory: data['_mainCategory._id'],
			_mainCategoryName: data['_mainCategory.name']
		};
	}
}
