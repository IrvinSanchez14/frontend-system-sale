import { combineReducers } from 'redux';
import Factura from 'containers/Factura/Redux/reducers';
import Caja from 'containers/Caja/Redux/reducers';
import Productos from 'containers/Productos/Redux/reducers';

const appReducer = combineReducers({
	Factura,
	Caja,
	Productos,
});

export default appReducer;
