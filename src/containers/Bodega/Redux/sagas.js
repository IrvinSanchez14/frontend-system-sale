import { put, call, takeEvery } from 'redux-saga/effects';

import { FETCH_COMPRAS } from './constans';
import * as actions from './actions';
import { ComprasClient } from 'services/logicServices';

export function* readCompras(action) {
	let compra = new ComprasClient();
	let listCompras;
	try {
		listCompras = yield call(() =>
			compra
				.getCompraDetalle(action.id_sucursal)
				.then(response => response.data)
		);
		yield put(actions.setComprasSucces(listCompras));
	} catch (err) {
		yield put(actions.setComprasFail(err));
	}
}

export function* fetchCompras() {
	yield takeEvery(FETCH_COMPRAS, readCompras);
}

export default fetchCompras;
