import { put, call, takeEvery } from 'redux-saga/effects';

import { FETCH_PRODUCTOS_LIST } from './constants';
import * as actions from './actions';
import { ProductClient } from 'services/logicServices';

export function* readProductosList() {
	let productos = new ProductClient();
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

export function* fetchProductos() {
	yield takeEvery(FETCH_PRODUCTOS_LIST, readProductosList);
}

export default fetchProductos;
