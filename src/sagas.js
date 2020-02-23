import { fork } from 'redux-saga/effects';
import CajaSagas from 'containers/Caja/Redux/sagas';

export default function* rootSaga() {
	const allSagas = [CajaSagas];
	for (let i = 0; i < allSagas.length; i += 1) {
		yield fork(allSagas[i]);
	}
}
