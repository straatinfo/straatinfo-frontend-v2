import { tassign } from 'tassign';
import * as _ from 'lodash';

export const categorySubACreateAttempt = (state, action) => {
    return tassign(state, {
        categorySubAs: state.categorySubAs,
        selectedCategorySubA: state.selectedCategorySubA,
        spinner: true,
        error: null
    });
};

export const categorySubACreateFulfilled = (state, action) => {
    return tassign(state, {
        categorySubAs: [
            ...state.categorySubAs,
            action.payload
        ],
        selectedCategorySubA: state.selectedCategorySubA,
        spinner: false,
        error: ''
    });
};

export const categorySubACreateFailed = (state, action) => {
    return tassign(state, {
        categorySubAs: state.categorySubAs,
        selectedCategorySubA: state.selectedCategorySubA,
        spinner: false,
        error: action.error
    });
};

export const categorySubAGetAttempt = (state, action) => {
    return tassign(state, {
        categorySubAs: state.categorySubAs,
        selectedCategorySubA: state.selectedCategorySubA,
        spinner: true,
        error: ''
    });
};

export const categorySubAGetFulfilled = (state, action) => {
    return tassign(state, {
        categorySubAs: action.payload,
        selectedCategorySubA: state.selectedCategorySubA,
        spinner: false,
        error: ''
    });
};

export const categorySubAGetFailed = (state, action) => {
    return tassign(state, {
        categorySubAs: state.categorySubAs,
        selectedCategorySubA: state.selectedCategorySubA,
        spinner: false,
        error: action.error
    });
};

export const categorySubAUpdateAttempt = (state, action) => {
    return tassign(state, {
        categorySubAs: state.categorySubAs,
        selectedCategorySubA: state.selectedCategorySubA,
        spinner: true,
        error: ''
    });
};

export const categorySubAUpdateFulfilled = (state, action) => {
    const index = _.findIndex(state.categorySubAs, (h) => { return h.id == action.payload.id });
    let newArray = state.categorySubAs.slice();
    newArray.splice(index, 1, action.payload);
    return tassign(state, {
        categorySubAs: newArray,
        selectedCategorySubA: state.selectedCategorySubA,
        spinner: false,
        error: ''
    });
};

export const categorySubAUpdateFailed = (state, action) => {
    return tassign(state, {
        categorySubAs: state.categorySubAs,
        selectedCategorySubA: state.selectedCategorySubA,
        spinner: false,
        error: action.error
    });
};

export const categorySubADeleteAttempt = (state, action) => {
    return tassign(state, {
        categorySubAs: state.categorySubAs,
        selectedCategorySubA: state.selectedCategorySubA,
        spinner: true,
        error: ''
    });
};

export const categorySubADeleteFufilled = (state, action) => {
    const newArray = _.remove(state.categorySubAs, (h) => {
        return h.id != action.payload.id;
    });
    return tassign(state, {
        categorySubAs: newArray,
        selectedCategorySubA: state.selectedCategorySubA,
        spinner: false,
        error: ''
    });
};

export const categorySubADeleteFailed = (state, action) => {
    return tassign(state, {
        categorySubAs: state.categorySubAs,
        selectedCategorySubA: state.selectedCategorySubA,
        spinner: false,
        error: action.error
    });
};

export const categorySubASelectAttempt = (state, action) => {
    return tassign(state, {
        categorySubAs: state.categorySubAs,
        selectedCategorySubA: state.selectedCategorySubA,
        spinner: true,
        error: ''
    });
};

export const categorySubASelectFulfilled = (state, action) => {
    const index = _.findIndex(state.categorySubAs, (h) => { return h._id == action.payload });
    return tassign(state, {
        categorySubAs: state.categorySubAs,
        selectedCategorySubA: state.categorySubAs[index],
        spinner: false,
        error: ''
    });
};

export const categorySubASelectFailed = (state, action) => {
    return tassign(state, {
        categorySubAs: state.categorySubAs,
        selectedCategorySubA: state.selectedCategorySubA,
        spinner: false,
        error: action.error
    });
};
