import { fork } from 'redux-saga/effects';
import CajaSagas from 'containers/Caja/Redux/sagas';
import ProductoSagas from 'containers/Productos/Redux/sagas';
import BodegaSagas from 'containers/Bodega/Redux/sagas';
import CategoriaSagas from 'containers/Categoria/Redux/sagas';

export default function* rootSaga() {
	const allSagas = [CajaSagas, ...ProductoSagas, BodegaSagas, CategoriaSagas];
	for (let i = 0; i < allSagas.length; i += 1) {
		yield fork(allSagas[i]);
	}
}
