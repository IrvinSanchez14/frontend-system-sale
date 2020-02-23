import { combineReducers } from 'redux';
import Factura from 'containers/Factura/Redux/reducers';
import Caja from 'containers/Caja/Redux/reducers';

const appReducer = combineReducers({
	Factura,
	Caja,
});

export default appReducer;
