import * as ACTIONS from './constants';

const initialState = {
	tableInformation: [],
};

export default function(state = initialState, action) {
	console.log('REDUCER', state);
	console.log('REDUCER ACTION', action);
	switch (action.type) {
		case ACTIONS.CREATE_OBJECT_TABLE: {
			return {
				...state,
				tableInformation: [...state.tableInformation, action.response],
			};
		}
		case ACTIONS.REMOVE_OBJECT_TABLE: {
			return {
				...state,
				tableInformation: state.tableInformation.slice(0, action.index),
			};
		}
		default:
			return state;
	}
}
