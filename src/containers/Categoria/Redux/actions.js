import {
	FETCH_CATEGORIAS,
	SET_CATEGORIAS_FAIL,
	SET_CATEGORIAS_SUCCES,
} from './constants';

export const fetchCategorias = () => {
	return {
		type: FETCH_CATEGORIAS,
	};
};

export const setCategoriasSucces = data => {
	return {
		type: SET_CATEGORIAS_SUCCES,
		response: data,
	};
};

export const setCategoriaFail = error => {
	return {
		type: SET_CATEGORIAS_FAIL,
		error: error,
	};
};
