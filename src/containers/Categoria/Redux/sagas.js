import { put, call, takeEvery } from 'redux-saga/effects';

import { FETCH_CATEGORIAS } from './constants';
import * as actions from './actions';
import { CategoriaClient } from 'services/logicServices';

export function* readCategoriaList() {
	let categoria = new CategoriaClient();
	let listCategoria;
	try {
		listCategoria = yield call(() =>
			categoria.getCategorias().then(response => response.data)
		);
		yield put(actions.setCategoriasSucces(listCategoria));
	} catch (err) {
		yield put(actions.setCategoriaFail(err));
	}
}

export function* fetchCategorias() {
	yield takeEvery(FETCH_CATEGORIAS, readCategoriaList);
}

export default fetchCategorias;
