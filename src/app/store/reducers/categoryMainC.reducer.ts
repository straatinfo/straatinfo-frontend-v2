import { tassign } from 'tassign';
import * as _ from 'lodash';

export const categoryMainCCreateAttempt = (state, action) => {
    return tassign(state, {
        categoryMainCs: state.categoryMainCs,
        selectedCategoryMainC: state.selectedCategoryMainC,
        spinner: true,
        error: null
    });
};

export const categoryMainCCreateFulfilled = (state, action) => {
    return tassign(state, {
        categoryMainCs: [
            ...state.categoryMainCs,
            action.payload
        ],
        selectedCategoryMainC: state.selectedCategoryMainC,
        spinner: false,
        error: ''
    });
};

export const categoryMainCCreateFailed = (state, action) => {
    return tassign(state, {
        categoryMainCs: state.categoryMainCs,
        selectedCategoryMainC: state.selectedCategoryMainC,
        spinner: false,
        error: action.error
    });
};

export const categoryMainCGetAttempt = (state, action) => {
    return tassign(state, {
        categoryMainCs: state.categoryMainCs,
        selectedCategoryMainC: state.selectedCategoryMainC,
        spinner: true,
        error: ''
    });
};

export const categoryMainCGetFulfilled = (state, action) => {
    return tassign(state, {
        categoryMainCs: action.payload,
        selectedCategoryMainC: state.selectedCategoryMainC,
        spinner: false,
        error: ''
    });
};

export const categoryMainCGetFailed = (state, action) => {
    return tassign(state, {
        categoryMainCs: state.categoryMainCs,
        selectedCategoryMainC: state.selectedCategoryMainC,
        spinner: false,
        error: action.error
    });
};

export const categoryMainCUpdateAttempt = (state, action) => {
    return tassign(state, {
        categoryMainCs: state.categoryMainCs,
        selectedCategoryMainC: state.selectedCategoryMainC,
        spinner: true,
        error: ''
    });
};

export const categoryMainCUpdateFulfilled = (state, action) => {
    const index = _.findIndex(state.categoryMainCs, (h) => { return h._id == action.payload._id });
    let newArray = state.categoryMainCs.slice();
    newArray.splice(index, 1, action.payload);
    return tassign(state, {
        categoryMainCs: newArray,
        selectedCategoryMainC: state.selectedCategoryMainC,
        spinner: false,
        error: ''
    });
};

export const categoryMainCUpdateFailed = (state, action) => {
    return tassign(state, {
        categoryMainCs: state.categoryMainCs,
        selectedCategoryMainC: state.selectedCategoryMainC,
        spinner: false,
        error: action.error
    });
};

export const categoryMainCDeleteAttempt = (state, action) => {
    return tassign(state, {
        categoryMainCs: state.categoryMainCs,
        selectedCategoryMainC: state.selectedCategoryMainC,
        spinner: true,
        error: ''
    });
};

export const categoryMainCDeleteFufilled = (state, action) => {
    const newArray = _.remove(state.categoryMainCs, (h) => {
        return h._id != action.payload._id;
    });
    return tassign(state, {
        categoryMainCs: newArray,
        selectedCategoryMainC: state.selectedCategoryMainC,
        spinner: false,
        error: ''
    });
};

export const categoryMainCDeleteFailed = (state, action) => {
    return tassign(state, {
        categoryMainCs: state.categoryMainCs,
        selectedCategoryMainC: state.selectedCategoryMainC,
        spinner: false,
        error: action.error
    });
};

export const categoryMainCSelectAttempt = (state, action) => {
    return tassign(state, {
        categoryMainCs: state.categoryMainCs,
        selectedCategoryMainC: state.selectedCategoryMainC,
        spinner: true,
        error: ''
    });
};

export const categoryMainCSelectFulfilled = (state, action) => {
    return tassign(state, {
        categoryMainCs: state.categoryMainCs,
        selectedCategoryMainC: action.payload,
        spinner: false,
        error: ''
    });
};

export const categoryMainCSelectFailed = (state, action) => {
    return tassign(state, {
        categoryMainCs: state.categoryMainCs,
        selectedCategoryMainC: state.selectedCategoryMainC,
        spinner: false,
        error: action.error
    });
};
