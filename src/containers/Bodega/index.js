import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListIcon from '@material-ui/icons/List';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Compras from 'containers/Compras';
import RegistroInventario from 'containers/RegistroInventario';
import { fetchCompras } from 'containers/Bodega/Redux/actions';

function Bodega(Props) {
	const { fetchCompras } = Props;
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		fetchCompras(7);
	}, [fetchCompras]);

	const renderComponent = () => {
		switch (value) {
			case 0: {
				return <Compras />;
			}
			case 1: {
				return <RegistroInventario />;
			}
			default:
				return value;
		}
	};

	return (
		<div>
			<Tabs
				value={value}
				onChange={handleChange}
				variant="fullWidth"
				indicatorColor="primary"
				textColor="primary"
				aria-label="icon label tabs example">
				<Tab icon={<ShoppingCartIcon />} label="COMPRAS" />
				<Tab icon={<ListIcon />} label="REGISTRO" />
			</Tabs>
			{renderComponent()}
		</div>
	);
}

const actions = {
	fetchCompras,
};

export default connect(null, actions)(Bodega);
