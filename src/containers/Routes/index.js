import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from 'containers/Header';
import FormAddProducto from 'containers/Productos/FormularioProductos';
import Productos from 'containers/Productos';
//import SnackBar from 'components/SnackBar';
import ExampleComponent from 'components/ComponentExample';
import Caja from 'containers/Caja';
import Bodega from 'containers/Bodega';

const Routes = () => {
	return (
		<div>
			<Header
				children={
					<Switch>
						<Route path="/Productos" exact component={Productos} />
						<Route path="/" exact component={Productos} />
						<Route path="/testFormularios" exact component={FormAddProducto} />
						<Route path="/ejemplos" exact component={ExampleComponent} />
						<Route path="/Caja" exact component={Caja} />
						<Route path="/Bodega" exact component={Bodega} />
					</Switch>
				}
			/>
		</div>
	);
};

export default Routes;
