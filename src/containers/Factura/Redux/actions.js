import {
	CREATE_OBJECT_TABLE,
	REMOVE_OBJECT_TABLE,
	FINISH_FACTURA_CLIENT,
} from './constants';

export const createObjectTable = object => {
	return {
		type: CREATE_OBJECT_TABLE,
		response: object,
	};
};

export const removeObject = index => {
	return {
		type: REMOVE_OBJECT_TABLE,
		index: index,
	};
};

export const finishFactura = () => {
	return {
		type: FINISH_FACTURA_CLIENT,
	};
};
