import * as ACTIONS from './constants';

const initialState = {
	categoriaData: [],
	errorCategoria: '',
	loading: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.SET_CATEGORIAS_SUCCES: {
			return {
				...state,
				categoriaData: action.response,
				loading: true,
			};
		}
		case ACTIONS.SET_CATEGORIAS_FAIL: {
			return {
				...state,
				errorCategoria: action.error,
				loading: true,
			};
		}
		default:
			return state;
	}
}
