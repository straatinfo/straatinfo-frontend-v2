import { tassign} from 'tassign';
import * as _ from 'lodash';
import { IDesignStore } from '../design.store';

export const designCreateAttempt = (state: IDesignStore, action: any) => {
	return tassign<IDesignStore, IDesignStore>(state, {
		designs: state.designs,
		selectedDesign: state.selectedDesign,
		spinner: true,
		error: null,
		success: null
	});
};

export const designCreateFulfilled = (state: IDesignStore, action: any) => {
	return tassign<IDesignStore, IDesignStore>(state, {
		designs: [
			...state.designs,
			action.payload
		],
		selectedDesign: state.selectedDesign,
		spinner: false,
		error: null,
		success: `Design ID: ${action.payload._id} was successfully created`
	});
};

export const designCreateFailed = (state: IDesignStore, action: any) => {
	return tassign<IDesignStore, IDesignStore>(state, {
		designs: state.designs,
		selectedDesign: state.selectedDesign,
		spinner: false,
		error: action.error,
		success: null
	});
};

export const designGetAttempt = (state: IDesignStore, action: any) => {
	return tassign<IDesignStore, IDesignStore>(state, {
		designs: state.designs,
		selectedDesign: state.selectedDesign,
		spinner: true,
		error: null,
		success: null
	});
};

export const designGetFulfilled = (state: IDesignStore, action: any) => {
	return tassign<IDesignStore, IDesignStore>(state, {
		designs: action.payload,
		selectedDesign: state.selectedDesign,
		spinner: false,
		error: null,
		success: 'Designs were successfully loaded'
	});
};

export const designGetFailed = (state: IDesignStore, action: any) => {
	return tassign<IDesignStore, IDesignStore>(state, {
		designs: state.designs,
		selectedDesign: state.selectedDesign,
		spinner: false,
		error: action.error,
		success: null
	});
};

export const designUpdateAttempt = (state: IDesignStore, action: any) => {
	return tassign<IDesignStore, IDesignStore>(state, {
		designs: state.designs,
		selectedDesign: state.selectedDesign,
		spinner: true,
		error: null,
		success: null
	});
};

export const designUpdateFulfilled = (state: IDesignStore, action: any) => {
	const index = _.findIndex(state.designs, (h) => { return h._id == action.payload._id });
	let newArray = state.designs.slice();
	newArray.splice(index, 1, action.payload);
	return tassign<IDesignStore, IDesignStore>(state, {
		designs: newArray,
		selectedDesign: state.selectedDesign,
		spinner: false,
		error: null,
		success: `Design ID: ${action.payload._id} was successfully updated`
	});
};

export const designUpdateFailed = (state: IDesignStore, action: any) => {
	return tassign<IDesignStore, IDesignStore>(state, {
		designs: state.designs,
		selectedDesign: state.selectedDesign,
		spinner: false,
		error: action.error,
		success: null
	});
};

export const designDeleteAttempt = (state: IDesignStore, action: any) => {
	return tassign<IDesignStore, IDesignStore>(state, {
		designs: state.designs,
		selectedDesign: state.selectedDesign,
		spinner: true,
		error: null,
		success: null
	});
};

export const designDeleteFufilled = (state: IDesignStore, action: any) => {
	const newArray = _.remove(state.designs, (h) => {
		return h._id != action.payload._id;
	});
	return tassign<IDesignStore, IDesignStore>(state, {
		designs: newArray,
		selectedDesign: state.selectedDesign,
		spinner: false,
		error: null,
		success: `Design ID: ${action.payload._id} was successfully deleted`
	});
};

export const designDeleteFailed = (state: IDesignStore, action: any) => {
	return tassign<IDesignStore, IDesignStore>(state, {
		designs: state.designs,
		selectedDesign: state.selectedDesign,
		spinner: false,
		error: action.error,
		success: null
	});
};

export const designSelectAttempt = (state: IDesignStore, action: any) => {
	return tassign<IDesignStore, IDesignStore>(state, {
		designs: state.designs,
		selectedDesign: state.selectedDesign,
		spinner: true,
		error: null,
		success: null
	});
};

export const designSelectFulfilled = (state: IDesignStore, action: any) => {
	return tassign<IDesignStore, IDesignStore>(state, {
		designs: state.designs,
		selectedDesign: action.payload,
		spinner: false,
		error: null,
		success: `Design ID: ${action.payload._id} was successfully loaded`
	});
};

export const designSelectFailed = (state: IDesignStore, action: any) => {
	return tassign<IDesignStore, IDesignStore>(state, {
		designs: state.designs,
		selectedDesign: state.selectedDesign,
		spinner: false,
		error: action.error,
		success: null
	});
};
