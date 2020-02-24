import React from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListIcon from '@material-ui/icons/List';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Compras from 'containers/Compras';
import RegistroInventario from 'containers/RegistroInventario';

function Bodega() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const renderComponent = () => {
		switch (value) {
			case 0: {
				return <Compras />;
			}
			case 1: {
				return <RegistroInventario />;
			}
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

export default Bodega;
