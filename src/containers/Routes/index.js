import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from 'containers/Header';
import FormAddProducto from 'containers/Productos/FormularioProductos';
import Productos from 'containers/Productos';
import SnackBar from 'components/SnackBar';

const Routes = () => {
	return (
		<div>
			<Header
				children={
					<Switch>
						<Route path="/Productos" exact component={Productos} />
						<Route path="/" exact component={SnackBar} />
						<Route path="/testFormularios" exact component={FormAddProducto} />
					</Switch>
				}
			/>
		</div>
	);
};

export default Routes;
