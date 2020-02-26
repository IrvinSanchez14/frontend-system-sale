import { put, call, takeEvery } from 'redux-saga/effects';

import {
	FETCH_PRODUCTOS_LIST,
	UPDATE_PRODUCTOS,
	CREATE_PRODUCTO,
} from './constants';
import * as actions from './actions';
import { ProductClient } from 'services/logicServices';

const productos = new ProductClient();

export function* readProductosList() {
	let listProductos;
	try {
		listProductos = yield call(() =>
			productos.getProduct().then(response => response.data)
		);
		yield put(actions.setProductoSucces(listProductos));
	} catch (err) {
		yield put(actions.setProductoFail(err));
	}
}

export function* editProducto(action) {
	let updateProductos;
	try {
		updateProductos = yield call(() =>
			productos
				.updateProduct(action.id, action.object)
				.then(response => response.data)
		);
		yield put(actions.updateProductosSuccess(updateProductos));
	} catch (err) {
		yield put(actions.setProductoFail(err));
	}
}

export function* crearProducto(action) {
	let creacionProducto;
	try {
		creacionProducto = yield call(() =>
			productos.createProduct(action.object).then(response => response.data)
		);
		yield put(actions.createProductoSuccess(creacionProducto));
	} catch (err) {
		yield put(actions.createProductoFail(err));
	}
}

export function* fetchProductos() {
	yield takeEvery(FETCH_PRODUCTOS_LIST, readProductosList);
}

export function* updateProductos() {
	yield takeEvery(UPDATE_PRODUCTOS, editProducto);
}

export function* createProducto() {
	yield takeEvery(CREATE_PRODUCTO, crearProducto);
}

export default [fetchProductos, updateProductos, createProducto];
