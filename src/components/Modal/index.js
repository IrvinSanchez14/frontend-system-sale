import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useTheme } from '@material-ui/core/styles';

function Modal(Props) {
	const { visibleModal, setVisibleModal, children, setButtonSave } = Props;
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	function handleClose() {
		setVisibleModal(false);
	}

	function sendData() {
		setButtonSave(true);
	}

	return (
		<Dialog
			fullScreen={fullScreen}
			open={visibleModal}
			onClose={handleClose}
			aria-labelledby="responsive-dialog-title">
			<DialogTitle
				id="responsive-dialog-title"
				style={{
					backgroundColor: '#000',
					color: '#FFF',
				}}>
				Agregar nuevo registo
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions className="dialogo">
				<Button onClick={handleClose} className="ui buttonCancelar" color="primary">
					Cancelar
				</Button>
				<Button onClick={sendData} color="primary" className="ui buttonGuardar" autoFocus>
					Guardar
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default Modal;
