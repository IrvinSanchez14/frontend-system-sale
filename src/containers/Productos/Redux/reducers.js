import * as ACTIONS from './constants';

const initialState = {
	productoData: [],
	errorProducto: '',
	loading: false,
	updateProducto: false,
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
		case ACTIONS.EDIT_PRODUCTOS_ITEM_STATUS: {
			return {
				...state,
				productoData: state.productoData.map(sp =>
					sp.id === action.index ? { ...sp, status: action.item } : sp
				),
				loading: true,
			};
		}
		case ACTIONS.EDIT_PRODUCTOS_ITEM_NOMBRE: {
			return {
				...state,
				productoData: state.productoData.map(sp =>
					sp.id === action.index ? { ...sp, nombre: action.item } : sp
				),
				loading: true,
			};
		}
		case ACTIONS.EDIT_PRODUCTOS_ITEM_DESCRIPCION: {
			return {
				...state,
				productoData: state.productoData.map(sp =>
					sp.id === action.id ? { ...sp, descripcion: action.item } : sp
				),
				loading: true,
			};
		}
		case ACTIONS.UPDATE_PRODUCTOS_SUCCESS: {
			return {
				...state,
				productoData: state.productoData.map(sp =>
					sp.id === action.object.id ? { ...sp, ...action.object } : sp
				),
				loading: true,
				updateProducto: true,
			};
		}
		case ACTIONS.CREATE_PRODUCTO_SUCCESS: {
			return {
				...state,
				productoData: [action.response, ...state.productoData],
				loading: true,
				updateProducto: false,
			};
		}
		default:
			return state;
	}
}
