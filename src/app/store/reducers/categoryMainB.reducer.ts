import { tassign } from 'tassign';
import * as _ from 'lodash';

export const categoryMainBCreateAttempt = (state, action) => {
    return tassign(state, {
        categoryMainBs: state.categoryMainBs,
        selectedCategoryMainB: state.selectedCategoryMainB,
        spinner: true,
        error: null
    });
};

export const categoryMainBCreateFulfilled = (state, action) => {
    return tassign(state, {
        categoryMainBs: [
            ...state.categoryMainBs,
            action.payload
        ],
        selectedCategoryMainB: state.selectedCategoryMainB,
        spinner: false,
        error: ''
    });
};

export const categoryMainBCreateFailed = (state, action) => {
    return tassign(state, {
        categoryMainBs: state.categoryMainBs,
        selectedCategoryMainB: state.selectedCategoryMainB,
        spinner: false,
        error: action.error
    });
};

export const categoryMainBGetAttempt = (state, action) => {
    return tassign(state, {
        categoryMainBs: state.categoryMainBs,
        selectedCategoryMainB: state.selectedCategoryMainB,
        spinner: true,
        error: ''
    });
};

export const categoryMainBGetFulfilled = (state, action) => {
    return tassign(state, {
        categoryMainBs: action.payload,
        selectedCategoryMainB: state.selectedCategoryMainB,
        spinner: false,
        error: ''
    });
};

export const categoryMainBGetFailed = (state, action) => {
    return tassign(state, {
        categoryMainBs: state.categoryMainBs,
        selectedCategoryMainB: state.selectedCategoryMainB,
        spinner: false,
        error: action.error
    });
};

export const categoryMainBUpdateAttempt = (state, action) => {
    return tassign(state, {
        categoryMainBs: state.categoryMainBs,
        selectedCategoryMainB: state.selectedCategoryMainB,
        spinner: true,
        error: ''
    });
};

export const categoryMainBUpdateFulfilled = (state, action) => {
    const index = _.findIndex(state.categoryMainBs, (h) => { return h._id == action.payload._id });
    let newArray = state.categoryMainBs.slice();
    newArray.splice(index, 1, action.payload);
    return tassign(state, {
        categoryMainBs: newArray,
        selectedCategoryMainB: state.selectedCategoryMainB,
        spinner: false,
        error: ''
    });
};

export const categoryMainBUpdateFailed = (state, action) => {
    return tassign(state, {
        categoryMainBs: state.categoryMainBs,
        selectedCategoryMainB: state.selectedCategoryMainB,
        spinner: false,
        error: action.error
    });
};

export const categoryMainBDeleteAttempt = (state, action) => {
    return tassign(state, {
        categoryMainBs: state.categoryMainBs,
        selectedCategoryMainB: state.selectedCategoryMainB,
        spinner: true,
        error: ''
    });
};

export const categoryMainBDeleteFufilled = (state, action) => {
    const newArray = _.remove(state.categoryMainBs, (h) => {
        return h._id != action.payload._id;
    });
    return tassign(state, {
        categoryMainBs: newArray,
        selectedCategoryMainB: state.selectedCategoryMainB,
        spinner: false,
        error: ''
    });
};

export const categoryMainBDeleteFailed = (state, action) => {
    return tassign(state, {
        categoryMainBs: state.categoryMainBs,
        selectedCategoryMainB: state.selectedCategoryMainB,
        spinner: false,
        error: action.error
    });
};

export const categoryMainBSelectAttempt = (state, action) => {
    return tassign(state, {
        categoryMainBs: state.categoryMainBs,
        selectedCategoryMainB: state.selectedCategoryMainB,
        spinner: true,
        error: ''
    });
};

export const categoryMainBSelectFulfilled = (state, action) => {
    return tassign(state, {
        categoryMainBs: state.categoryMainBs,
        selectedCategoryMainB: action.payload,
        spinner: false,
        error: ''
    });
};

export const categoryMainBSelectFailed = (state, action) => {
    return tassign(state, {
        categoryMainBs: state.categoryMainBs,
        selectedCategoryMainB: state.selectedCategoryMainB,
        spinner: false,
        error: action.error
    });
};
