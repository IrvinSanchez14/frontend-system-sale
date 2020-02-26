import {
	FETCH_PRODUCTOS_LIST,
	SET_PRODUCTOS_LIST_SUCCES,
	SET_PRODUCTOS_LIST_FAIL,
	EDIT_PRODUCTOS_ITEM_STATUS,
	EDIT_PRODUCTOS_ITEM_NOMBRE,
	EDIT_PRODUCTOS_ITEM_DESCRIPCION,
	UPDATE_PRODUCTOS,
	UPDATE_PRODUCTOS_SUCCESS,
	UPDATE_PRODUCTOS_FAIL,
	CREATE_PRODUCTO,
	CREATE_PRODUCTO_SUCCESS,
	CREATE_PRODUCTO_FAIL,
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

export const editProductosStatus = (object, index) => {
	return {
		type: EDIT_PRODUCTOS_ITEM_STATUS,
		item: object,
		index: index,
	};
};

export const editProductosNombre = (object, index) => {
	return {
		type: EDIT_PRODUCTOS_ITEM_NOMBRE,
		item: object,
		index: index,
	};
};

export const editProductosDescripcion = (object, index) => {
	return {
		type: EDIT_PRODUCTOS_ITEM_DESCRIPCION,
		item: object,
		index: index,
	};
};

export const updateProductos = (data, id) => {
	return {
		type: UPDATE_PRODUCTOS,
		object: data,
		id: id,
	};
};

export const updateProductosSuccess = data => {
	return {
		type: UPDATE_PRODUCTOS_SUCCESS,
		object: data,
	};
};

export const updateProductosFail = error => {
	return {
		type: UPDATE_PRODUCTOS_FAIL,
		error: error,
	};
};

export const createProducto = object => {
	return {
		type: CREATE_PRODUCTO,
		object: object,
	};
};

export const createProductoSuccess = response => {
	return {
		type: CREATE_PRODUCTO_SUCCESS,
		response: response,
	};
};

export const createProductoFail = error => {
	return {
		type: CREATE_PRODUCTO_FAIL,
		error: error,
	};
};
