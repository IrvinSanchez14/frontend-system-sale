import {
	FETCH_PRODUCTOS_LIST,
	SET_PRODUCTOS_LIST_SUCCES,
	SET_PRODUCTOS_LIST_FAIL,
} from './constants';

export const fetchProductos = () => {
	return {
		type: FETCH_PRODUCTOS_LIST,
	};
};

export const setProductoSucces = data => {
	return {
		type: SET_PRODUCTOS_LIST_SUCCES,
		response: data,
	};
};

export const setProductoFail = error => {
	return {
		type: SET_PRODUCTOS_LIST_FAIL,
		error: error,
	};
};
