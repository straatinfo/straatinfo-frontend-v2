import { tassign } from 'tassign';
import * as _ from 'lodash';

export const categoryCreateAttempt = (state, action) => {
    return tassign(state, {
        categorys: state.categorys,
        selectedCategory: state.selectedCategory,
        spinner: true,
        error: null
    });
};

export const categoryCreateFulfilled = (state, action) => {
    return tassign(state, {
        categorys: [
            ...state.categorys,
            action.payload
        ],
        selectedCategory: state.selectedCategory,
        spinner: false,
        error: ''
    });
};

export const categoryCreateFailed = (state, action) => {
    return tassign(state, {
        categorys: state.categorys,
        selectedCategory: state.selectedCategory,
        spinner: false,
        error: action.error
    });
};

export const categoryGetAttempt = (state, action) => {
    return tassign(state, {
        categorys: state.categorys,
        selectedCategory: state.selectedCategory,
        spinner: true,
        error: ''
    });
};

export const categoryGetFulfilled = (state, action) => {
    return tassign(state, {
        categorys: action.payload,
        selectedCategory: state.selectedCategory,
        spinner: false,
        error: ''
    });
};

export const categoryGetFailed = (state, action) => {
    return tassign(state, {
        categorys: state.categorys,
        selectedCategory: state.selectedCategory,
        spinner: false,
        error: action.error
    });
};

export const categoryUpdateAttempt = (state, action) => {
    return tassign(state, {
        categorys: state.categorys,
        selectedCategory: state.selectedCategory,
        spinner: true,
        error: ''
    });
};

export const categoryUpdateFulfilled = (state, action) => {
    const index = _.findIndex(state.categorys, (h) => { return h.id == action.payload.id });
    let newArray = state.categorys.slice();
    newArray.splice(index, 1, action.payload);
    return tassign(state, {
        categorys: newArray,
        selectedCategory: state.selectedCategory,
        spinner: false,
        error: ''
    });
};

export const categoryUpdateFailed = (state, action) => {
    return tassign(state, {
        categorys: state.categorys,
        selectedCategory: state.selectedCategory,
        spinner: false,
        error: action.error
    });
};

export const categoryDeleteAttempt = (state, action) => {
    return tassign(state, {
        categorys: state.categorys,
        selectedCategory: state.selectedCategory,
        spinner: true,
        error: ''
    });
};

export const categoryDeleteFufilled = (state, action) => {
    const newArray = _.remove(state.categorys, (h) => {
        return h.id != action.payload.id;
    });
    return tassign(state, {
        categorys: newArray,
        selectedCategory: state.selectedCategory,
        spinner: false,
        error: ''
    });
};

export const categoryDeleteFailed = (state, action) => {
    return tassign(state, {
        categorys: state.categorys,
        selectedCategory: state.selectedCategory,
        spinner: false,
        error: action.error
    });
};

export const categorySelectAttempt = (state, action) => {
    return tassign(state, {
        categorys: state.categorys,
        selectedCategory: state.selectedCategory,
        spinner: true,
        error: ''
    });
};

export const categorySelectFulfilled = (state, action) => {
    const index = _.findIndex(state.categorys, (h) => { return h._id == action.payload });
    return tassign(state, {
        categorys: state.categorys,
        selectedCategory: state.categorys[index],
        spinner: false,
        error: ''
    });
};

export const categorySelectFailed = (state, action) => {
    return tassign(state, {
        categorys: state.categorys,
        selectedCategory: state.selectedCategory,
        spinner: false,
        error: action.error
    });
};
