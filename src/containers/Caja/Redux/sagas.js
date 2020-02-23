import { put, call, takeEvery } from 'redux-saga/effects';

import { FETCH_INVENTARIO_DISPONIBLE } from './constants';
import * as actions from './actions';
import { InventarioSucursal } from 'services/logicServices';

export function* readAllInventarioDisponible() {
	let inventario = new InventarioSucursal();
	let listComboBox;
	try {
		listComboBox = yield call(() =>
			inventario.getInventarioSucursal(7).then(response => response.data)
		);
		yield put(actions.setInventarioSucces(listComboBox));
	} catch (err) {
		yield put(actions.setInventarioFail(err));
	}
}

export function* fetchInventario() {
	yield takeEvery(FETCH_INVENTARIO_DISPONIBLE, readAllInventarioDisponible);
}

export default fetchInventario;
