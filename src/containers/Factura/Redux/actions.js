import {
	GET_OBJECT_TABLE,
	CREATE_OBJECT_TABLE,
	REMOVE_OBJECT_TABLE,
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
