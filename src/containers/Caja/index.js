import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HistoryIcon from '@material-ui/icons/History';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Factura from 'containers/Factura';
import Historial from 'containers/Historial';

function Caja() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const renderComponent = () => {
		switch (value) {
			case 0: {
				return <Factura />;
			}
			case 1: {
				return <Historial />;
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
				<Tab icon={<AssignmentIcon />} label="FACTURA" />
				<Tab icon={<HistoryIcon />} label="HISTORIAL" />
			</Tabs>
			{renderComponent()}
		</div>
	);
}

export default Caja;
