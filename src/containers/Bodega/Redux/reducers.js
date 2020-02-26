import * as ACTIONS from './constans';

const initialState = {
	compraData: [],
	errorCompra: '',
	loading: false,
	id_compra_selected: 0,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.SET_COMPRAS_SUCESS: {
			return {
				...state,
				compraData: action.response,
				loading: true,
			};
		}
		case ACTIONS.SET_COMPRAS_FAIL: {
			return {
				...state,
				errorCompra: action.error,
				loading: true,
			};
		}
		case ACTIONS.ID_COMPRA_SELECTED: {
			return {
				...state,
				id_compra_selected: action.id,
			};
		}
		default:
			return state;
	}
}
