import React from 'react';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import Modal from 'components/Modal';
import FormAddProducto from 'containers/Productos/FormularioProductos';
import { createProducto } from 'containers/Productos/Redux/actions';

const defaultToolbarStyles = {
	iconButton: {},
};

function CustomToolbar(props) {
	const { createProducto } = props;
	const [visibleModal, setVisibleModal] = React.useState(false);
	const [objectData, setObjectData] = React.useState(undefined);

	const handleClick = () => {
		setVisibleModal(true);
	};

	const addRegisterDB = async () => {
		createProducto(objectData);
		setVisibleModal(false);
	};

	const { classes } = props;

	return (
		<React.Fragment>
			<Tooltip title={'Agregar Registro'}>
				<IconButton className={classes.iconButton} onClick={handleClick}>
					<AddIcon className={classes.deleteIcon} />
				</IconButton>
			</Tooltip>
			<Modal
				object={objectData}
				visibleModal={visibleModal}
				setVisibleModal={setVisibleModal}
				textTitle={'Espacio para componentes'}
				children={
					<FormAddProducto object={objectData} setObject={setObjectData} />
				}
				addRegisterDB={addRegisterDB}
			/>
		</React.Fragment>
	);
}

const actions = {
	createProducto,
};

export default connect(
	null,
	actions
)(withStyles(defaultToolbarStyles, { name: 'CustomToolbar' })(CustomToolbar));
