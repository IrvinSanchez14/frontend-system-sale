import { fork } from 'redux-saga/effects';

export default function* rootSaga() {
	const allSagas = [
	];
	for (let i = 0; i < allSagas.length; i += 1) {
		yield fork(allSagas[i]);
	}
}
