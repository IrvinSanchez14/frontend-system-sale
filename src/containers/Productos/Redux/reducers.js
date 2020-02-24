import * as ACTIONS from './constants';

const initialState = {
	productoData: [],
	errorProducto: '',
	loading: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.SET_PRODUCTOS_LIST_SUCCES: {
			return {
				...state,
				productoData: action.response,
				loading: true,
			};
		}
		case ACTIONS.SET_PRODUCTOS_LIST_FAIL: {
			return {
				...state,
				errorProducto: action.error,
				loading: true,
			};
		}
		default:
			return state;
	}
}
