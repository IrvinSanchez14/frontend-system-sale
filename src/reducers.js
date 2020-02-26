import { combineReducers } from 'redux';
import Factura from 'containers/Factura/Redux/reducers';
import Caja from 'containers/Caja/Redux/reducers';
import Productos from 'containers/Productos/Redux/reducers';
import Bodega from 'containers/Bodega/Redux/reducers';
import Categorias from 'containers/Categoria/Redux/reducers';

const appReducer = combineReducers({
	Factura,
	Caja,
	Productos,
	Bodega,
	Categorias,
});

export default appReducer;
