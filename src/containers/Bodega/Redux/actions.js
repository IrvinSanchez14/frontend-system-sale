import {
	FETCH_COMPRAS,
	SET_COMPRAS_FAIL,
	SET_COMPRAS_SUCESS,
	ID_COMPRA_SELECTED,
} from './constans';

export const fetchCompras = id => {
	return {
		type: FETCH_COMPRAS,
		id_sucursal: id,
	};
};

export const setComprasSucces = data => {
	return {
		type: SET_COMPRAS_SUCESS,
		response: data,
	};
};

export const setComprasFail = error => {
	return {
		type: SET_COMPRAS_FAIL,
		error: error,
	};
};

export const idSelectedCompra = id => {
	return {
		type: ID_COMPRA_SELECTED,
		id: id,
	};
};
