import * as ACTIONS from './constants';

const initialState = {
	tableInformation: [],
};

export default function(state = initialState, action) {
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
		case ACTIONS.FINISH_FACTURA_CLIENT: {
			return {
				...state,
				tableInformation: [],
			};
		}
		default:
			return state;
	}
}
