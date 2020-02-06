import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Modal from 'components/Modal';
import FormAddProducto from 'containers/Productos/FormularioProductos';
import { ProductClient } from 'services/logicServices';

const defaultToolbarStyles = {
	iconButton: {},
};

function CustomToolbar(props) {
	const [ visibleModal, setVisibleModal ] = React.useState(false);
	const [ objectData, setObjectData ] = React.useState(undefined);
	const [ buttonSave, setButtonSave ] = React.useState(false);

	const handleClick = () => {
		setVisibleModal(true);
	};

	const addRegisterDB = async () => {
		if (buttonSave) {
			let productos = new ProductClient();
			setButtonSave(false);
			await productos.createProduct(objectData).then((response) => {
				console.log('response', response);
				setVisibleModal(false);
			});
		}
	};

	const { classes } = props;
	addRegisterDB();

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
				children={<FormAddProducto object={objectData} setObject={setObjectData} />}
				setButtonSave={setButtonSave}
			/>
		</React.Fragment>
	);
}

export default withStyles(defaultToolbarStyles, { name: 'CustomToolbar' })(CustomToolbar);
