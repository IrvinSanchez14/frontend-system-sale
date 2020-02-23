import * as ACTIONS from './constants';

const initialState = {
	inventarioData: [],
	errorInventario: '',
	loading: false,
};

export default function(state = initialState, action) {
	console.log('REDUCER', action);
	switch (action.type) {
		case ACTIONS.SET_INVENTARIO_DISPONIBLE_SUCCES: {
			return {
				...state,
				inventarioData: action.response,
				loading: true,
			};
		}
		case ACTIONS.SET_INVENTARIO_DISPONIBLE_FAIL: {
			return {
				...state,
				errorInventario: action.error,
				loading: true,
			};
		}
		default:
			return state;
	}
}
