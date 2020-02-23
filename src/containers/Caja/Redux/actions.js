import {
	FETCH_INVENTARIO_DISPONIBLE,
	SET_INVENTARIO_DISPONIBLE_SUCCES,
	SET_INVENTARIO_DISPONIBLE_FAIL,
} from './constants';

export const fetchInventario = () => {
	return {
		type: FETCH_INVENTARIO_DISPONIBLE,
	};
};

export const setInventarioSucces = data => {
	return {
		type: SET_INVENTARIO_DISPONIBLE_SUCCES,
		response: data,
	};
};

export const setInventarioFail = error => {
	return {
		type: SET_INVENTARIO_DISPONIBLE_FAIL,
		error: error,
	};
};
