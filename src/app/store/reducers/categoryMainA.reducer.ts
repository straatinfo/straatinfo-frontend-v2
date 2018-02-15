import { tassign } from 'tassign';
import * as _ from 'lodash';

export const categoryMainACreateAttempt = (state, action) => {
    return tassign(state, {
        categoryMainAs: state.categoryMainAs,
        selectedCategoryMainA: state.selectedCategoryMainA,
        spinner: true,
        error: null
    });
};

export const categoryMainACreateFulfilled = (state, action) => {
    return tassign(state, {
        categoryMainAs: [
            ...state.categoryMainAs,
            action.payload
        ],
        selectedCategoryMainA: state.selectedCategoryMainA,
        spinner: false,
        error: ''
    });
};

export const categoryMainACreateFailed = (state, action) => {
    return tassign(state, {
        categoryMainAs: state.categoryMainAs,
        selectedCategoryMainA: state.selectedCategoryMainA,
        spinner: false,
        error: action.error
    });
};

export const categoryMainAGetAttempt = (state, action) => {
    return tassign(state, {
        categoryMainAs: state.categoryMainAs,
        selectedCategoryMainA: state.selectedCategoryMainA,
        spinner: true,
        error: ''
    });
};

export const categoryMainAGetFulfilled = (state, action) => {
    return tassign(state, {
        categoryMainAs: action.payload,
        selectedCategoryMainA: state.selectedCategoryMainA,
        spinner: false,
        error: ''
    });
};

export const categoryMainAGetFailed = (state, action) => {
    return tassign(state, {
        categoryMainAs: state.categoryMainAs,
        selectedCategoryMainA: state.selectedCategoryMainA,
        spinner: false,
        error: action.error
    });
};

export const categoryMainAUpdateAttempt = (state, action) => {
    return tassign(state, {
        categoryMainAs: state.categoryMainAs,
        selectedCategoryMainA: state.selectedCategoryMainA,
        spinner: true,
        error: ''
    });
};

export const categoryMainAUpdateFulfilled = (state, action) => {
    const index = _.findIndex(state.categoryMainAs, (h) => { return h.id == action.payload.id });
    let newArray = state.categoryMainAs.slice();
    newArray.splice(index, 1, action.payload);
    return tassign(state, {
        categoryMainAs: newArray,
        selectedCategoryMainA: state.selectedCategoryMainA,
        spinner: false,
        error: ''
    });
};

export const categoryMainAUpdateFailed = (state, action) => {
    return tassign(state, {
        categoryMainAs: state.categoryMainAs,
        selectedCategoryMainA: state.selectedCategoryMainA,
        spinner: false,
        error: action.error
    });
};

export const categoryMainADeleteAttempt = (state, action) => {
    return tassign(state, {
        categoryMainAs: state.categoryMainAs,
        selectedCategoryMainA: state.selectedCategoryMainA,
        spinner: true,
        error: ''
    });
};

export const categoryMainADeleteFufilled = (state, action) => {
    const newArray = _.remove(state.categoryMainAs, (h) => {
        return h.id != action.payload.id;
    });
    return tassign(state, {
        categoryMainAs: newArray,
        selectedCategoryMainA: state.selectedCategoryMainA,
        spinner: false,
        error: ''
    });
};

export const categoryMainADeleteFailed = (state, action) => {
    return tassign(state, {
        categoryMainAs: state.categoryMainAs,
        selectedCategoryMainA: state.selectedCategoryMainA,
        spinner: false,
        error: action.error
    });
};

export const categoryMainASelectAttempt = (state, action) => {
    return tassign(state, {
        categoryMainAs: state.categoryMainAs,
        selectedCategoryMainA: state.selectedCategoryMainA,
        spinner: true,
        error: ''
    });
};

export const categoryMainASelectFulfilled = (state, action) => {
    const index = _.findIndex(state.categoryMainAs, (h) => { return h._id == action.payload });
    return tassign(state, {
        categoryMainAs: state.categoryMainAs,
        selectedCategoryMainA: state.categoryMainAs[index],
        spinner: false,
        error: ''
    });
};

export const categoryMainASelectFailed = (state, action) => {
    return tassign(state, {
        categoryMainAs: state.categoryMainAs,
        selectedCategoryMainA: state.selectedCategoryMainA,
        spinner: false,
        error: action.error
    });
};
