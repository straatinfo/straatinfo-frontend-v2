import { IMainCategory } from '../interface/category/main-category.interface';
import { IMainViewCategory } from '../interface/category/main-category-view.interface';
import { ISubCategory } from '../interface/category/sub-category.interface';
import { ISubViewCategory } from '../interface/category/sub-category-view.interface';
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
    CATEGORYMAIN_A_SELECT_ATTEMPT,
    CATEGORYMAIN_A_SELECT_FAILED,
    CATEGORYMAIN_A_SELECT_FULFILLED
} from './actions/categoryMainA.action';

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
} from './actions/categoryMainB.action';

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
} from './actions/categoryMainC.action';

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
    CATEGORYSUB_A_SELECT_ATTEMPT
} from './actions/categorySubA.action';

import * as categoryMainA from './reducers/categoryMainA.reducer';
import * as categoryMainB from './reducers/categoryMainB.reducer';
import * as categoryMainC from './reducers/categoryMainC.reducer';
import * as categorySubA from './reducers/categorySubA.reducer';

export interface ICategoryMainAStore {
    categoryMainAs: IMainViewCategory[];
    selectedCategoryMainA: IMainViewCategory;
    spinner: boolean;
    error: string;
}

export interface ICategoryMainBStore {
    categoryMainBs: IMainViewCategory[];
    selectedCategoryMainB: IMainViewCategory;
    spinner: boolean;
    error: string;
}

export interface ICategoryMainCStore {
    categoryMainCs: IMainViewCategory[];
    selectedCategoryMainC: IMainViewCategory;
    spinner: boolean;
    error: string;
}

export interface ICategorySubAStore {
    categorySubAs: ISubViewCategory[];
    selectedCategorySubA: ISubViewCategory;
    spinner: boolean;
    error: string;
}

export const CATEGORYMAIN_A_INITIAL_STATE: ICategoryMainAStore = {
    categoryMainAs: [],
    selectedCategoryMainA: null,
    spinner: false,
    error: ''
}

export const CATEGORYMAIN_B_INITIAL_STATE: ICategoryMainBStore = {
    categoryMainBs: [],
    selectedCategoryMainB: null,
    spinner: false,
    error: ''
}

export const CATEGORYMAIN_C_INITIAL_STATE: ICategoryMainCStore = {
    categoryMainCs: [],
    selectedCategoryMainC: null,
    spinner: false,
    error: ''
}

export const CATEGORYSUB_A_INITIAL_STATE: ICategorySubAStore = {
    categorySubAs: [],
    selectedCategorySubA: null,
    spinner: false,
    error: ''
}

export function categoryMainAReducer(state: ICategoryMainAStore = CATEGORYMAIN_A_INITIAL_STATE, action): ICategoryMainAStore {
    switch (action.type){
        case CATEGORYMAIN_A_CREATE_ATTEMPT: return categoryMainA.categoryMainACreateAttempt(state, action);
        case CATEGORYMAIN_A_CREATE_FAILED: return categoryMainA.categoryMainACreateFailed(state, action);
        case CATEGORYMAIN_A_CREATE_FULFILLED: return categoryMainA.categoryMainACreateFulfilled(state, action);
        case CATEGORYMAIN_A_GET_ATTEMPT: return categoryMainA.categoryMainAGetAttempt(state, action);
        case CATEGORYMAIN_A_GET_FAILED: return categoryMainA.categoryMainAGetFailed(state, action);
        case CATEGORYMAIN_A_GET_FULFILLED: return categoryMainA.categoryMainAGetFulfilled(state, action);
        case CATEGORYMAIN_A_UPDATE_ATTEMPT: return categoryMainA.categoryMainAUpdateAttempt(state, action);
        case CATEGORYMAIN_A_UPDATE_FAILED: return categoryMainA.categoryMainAUpdateFailed(state, action);
        case CATEGORYMAIN_A_UPDATE_FULFILLED: return categoryMainA.categoryMainAUpdateFulfilled(state, action);
        case CATEGORYMAIN_A_DELETE_ATTEMPT: return categoryMainA.categoryMainADeleteAttempt(state, action);
        case CATEGORYMAIN_A_DELETE_FAILED: return categoryMainA.categoryMainADeleteFailed(state, action);
        case CATEGORYMAIN_A_DELETE_FULFILLED: return categoryMainA.categoryMainADeleteFufilled(state, action);
        case CATEGORYMAIN_A_SELECT_ATTEMPT: return categoryMainA.categoryMainASelectAttempt(state, action);
        case CATEGORYMAIN_A_SELECT_FAILED: return categoryMainA.categoryMainASelectFailed(state, action);
        case CATEGORYMAIN_A_SELECT_FULFILLED: return categoryMainA.categoryMainASelectFulfilled(state, action);
    }
    return state;
};

export function categoryMainBReducer(state: ICategoryMainBStore = CATEGORYMAIN_B_INITIAL_STATE, action): ICategoryMainBStore {
    switch (action.type) {
        case CATEGORYMAIN_B_CREATE_ATTEMPT: return categoryMainB.categoryMainBCreateAttempt(state, action);
        case CATEGORYMAIN_B_CREATE_FAILED: return categoryMainB.categoryMainBCreateFailed(state, action);
        case CATEGORYMAIN_B_CREATE_FULFILLED: return categoryMainB.categoryMainBCreateFulfilled(state, action);
        case CATEGORYMAIN_B_GET_ATTEMPT: return categoryMainB.categoryMainBGetAttempt(state, action);
        case CATEGORYMAIN_B_GET_FAILED: return categoryMainB.categoryMainBGetFailed(state, action);
        case CATEGORYMAIN_B_GET_FULFILLED: return categoryMainB.categoryMainBGetFulfilled(state, action);
        case CATEGORYMAIN_B_UPDATE_ATTEMPT: return categoryMainB.categoryMainBUpdateAttempt(state, action);
        case CATEGORYMAIN_B_UPDATE_FAILED: return categoryMainB.categoryMainBUpdateFailed(state, action);
        case CATEGORYMAIN_B_UPDATE_FULFILLED: return categoryMainB.categoryMainBUpdateFulfilled(state, action);
        case CATEGORYMAIN_B_DELETE_ATTEMPT: return categoryMainB.categoryMainBDeleteAttempt(state, action);
        case CATEGORYMAIN_B_DELETE_FAILED: return categoryMainB.categoryMainBDeleteFailed(state, action);
        case CATEGORYMAIN_B_DELETE_FULFILLED: return categoryMainB.categoryMainBDeleteFufilled(state, action);
        case CATEGORYMAIN_B_SELECT_ATTEMPT: return categoryMainB.categoryMainBSelectAttempt(state, action);
        case CATEGORYMAIN_B_SELECT_FAILED: return categoryMainB.categoryMainBSelectFailed(state, action);
        case CATEGORYMAIN_B_SELECT_FULFILLED: return categoryMainB.categoryMainBSelectFulfilled(state, action);
    }
    return state;
};

export function categoryMainCReducer(state: ICategoryMainCStore = CATEGORYMAIN_C_INITIAL_STATE, action): ICategoryMainCStore {
    switch (action.type) {
        case CATEGORYMAIN_C_CREATE_ATTEMPT: return categoryMainC.categoryMainCCreateAttempt(state, action);
        case CATEGORYMAIN_C_CREATE_FAILED: return categoryMainC.categoryMainCCreateFailed(state, action);
        case CATEGORYMAIN_C_CREATE_FULFILLED: return categoryMainC.categoryMainCCreateFulfilled(state, action);
        case CATEGORYMAIN_C_GET_ATTEMPT: return categoryMainC.categoryMainCGetAttempt(state, action);
        case CATEGORYMAIN_C_GET_FAILED: return categoryMainC.categoryMainCGetFailed(state, action);
        case CATEGORYMAIN_C_GET_FULFILLED: return categoryMainC.categoryMainCGetFulfilled(state, action);
        case CATEGORYMAIN_C_UPDATE_ATTEMPT: return categoryMainC.categoryMainCUpdateAttempt(state, action);
        case CATEGORYMAIN_C_UPDATE_FAILED: return categoryMainC.categoryMainCUpdateFailed(state, action);
        case CATEGORYMAIN_C_UPDATE_FULFILLED: return categoryMainC.categoryMainCUpdateFulfilled(state, action);
        case CATEGORYMAIN_C_DELETE_ATTEMPT: return categoryMainC.categoryMainCDeleteAttempt(state, action);
        case CATEGORYMAIN_C_DELETE_FAILED: return categoryMainC.categoryMainCDeleteFailed(state, action);
        case CATEGORYMAIN_C_DELETE_FULFILLED: return categoryMainC.categoryMainCDeleteFufilled(state, action);
        case CATEGORYMAIN_C_SELECT_ATTEMPT: return categoryMainC.categoryMainCSelectAttempt(state, action);
        case CATEGORYMAIN_C_SELECT_FAILED: return categoryMainC.categoryMainCSelectFailed(state, action);
        case CATEGORYMAIN_C_SELECT_FULFILLED: return categoryMainC.categoryMainCSelectFulfilled(state, action);
    }
    return state;
};

export function categorySubAReducer(state: ICategorySubAStore = CATEGORYSUB_A_INITIAL_STATE, action): ICategorySubAStore {
    switch (action.type) {
        case CATEGORYSUB_A_CREATE_ATTEMPT: return categorySubA.categorySubACreateAttempt(state, action);
        case CATEGORYSUB_A_CREATE_FAILED: return categorySubA.categorySubACreateFailed(state, action);
        case CATEGORYSUB_A_CREATE_FULFILLED: return categorySubA.categorySubACreateFulfilled(state, action);
        case CATEGORYSUB_A_GET_ATTEMPT: return categorySubA.categorySubAGetAttempt(state, action);
        case CATEGORYSUB_A_GET_FAILED: return categorySubA.categorySubAGetFailed(state, action);
        case CATEGORYSUB_A_GET_FULFILLED: return categorySubA.categorySubAGetFulfilled(state, action);
        case CATEGORYSUB_A_UPDATE_ATTEMPT: return categorySubA.categorySubAUpdateAttempt(state, action);
        case CATEGORYSUB_A_UPDATE_FAILED: return categorySubA.categorySubAUpdateFailed(state, action);
        case CATEGORYSUB_A_UPDATE_FULFILLED: return categorySubA.categorySubAUpdateFulfilled(state, action);
        case CATEGORYSUB_A_DELETE_ATTEMPT: return categorySubA.categorySubADeleteAttempt(state, action);
        case CATEGORYSUB_A_DELETE_FAILED: return categorySubA.categorySubADeleteFailed(state, action);
        case CATEGORYSUB_A_DELETE_FULFILLED: return categorySubA.categorySubADeleteFufilled(state, action);
        case CATEGORYSUB_A_SELECT_ATTEMPT: return categorySubA.categorySubASelectAttempt(state, action);
        case CATEGORYSUB_A_SELECT_FAILED: return categorySubA.categorySubASelectFailed(state, action);
        case CATEGORYSUB_A_SELECT_FULFILLED: return categorySubA.categorySubASelectFulfilled(state, action);
    }
    return state;
};