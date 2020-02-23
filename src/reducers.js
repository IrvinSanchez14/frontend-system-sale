import { combineReducers } from 'redux';
import Factura from 'containers/Factura/Redux/reducers';

const appReducer = combineReducers({
	Factura,
});

export default appReducer;
