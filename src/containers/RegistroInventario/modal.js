import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import SelectInput from 'components/SelectInput';
import { ComprasClient, EntradaInventarioClient } from 'services/logicServices';
import { fetchCompras } from 'containers/Bodega/Redux/actions';

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles(theme => ({}))(TableRow);

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function ModalDetallesCompras(Props) {
	const {
		open,
		setOpen,
		information,
		id_compra_selected,
		fetchCompras,
	} = Props;
	const [objectModal, setObjectModal] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		const newArr = _.map(information, function(element) {
			return _.extend({}, element, { statusUser: 0 });
		});
		setObjectModal(newArr);
	}, [information]);

	const handleClose = () => {
		setOpen(false);
	};

	const saveRegistro = () => {
		let registro = new ComprasClient();
		let entrada = new EntradaInventarioClient();
		const result = _.findIndex(objectModal, function(data) {
			return data.statusUser !== 2;
		});

		const objectRegistro = {
			descripcion: 'OK',
			compra_id: id_compra_selected,
			usuario_id: 1,
			sucursal_id: 7,
		};

		registro.createRegistroCompra(objectRegistro).then(response => {
			const id_registro = response.data.id;
			const registerDetalle = _.map(objectModal, function(element) {
				return _.extend({}, element, { registro_id: id_registro });
			});
			var filterObject = _.map(registerDetalle, function(c) {
				return _.omit(c, ['id']);
			});

			entrada.createInventarioEntrada(filterObject).then(r => {
				registro
					.updateCompra(id_compra_selected, { status: 'recibido' })
					.then(ru => {
						fetchCompras(7);
						handleClose();
					});
			});
		});
	};

	const mockData = [
		{ value: 2, text: 'Recibido' },
		{ value: 3, text: 'No Recibido' },
	];

	const changeStatusUser = (id, event) => {
		const newInformation = [...objectModal];
		newInformation[id].statusUser = event.target.value;
		setObjectModal(newInformation);
	};

	return (
		<div>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Sound
						</Typography>
						<Button autoFocus color="inherit" onClick={saveRegistro}>
							save
						</Button>
					</Toolbar>
				</AppBar>
				<div style={{ padding: '20px' }}>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="customized table">
							<TableHead>
								<TableRow>
									<StyledTableCell>ID</StyledTableCell>
									<StyledTableCell align="right">Producto</StyledTableCell>
									<StyledTableCell align="right">
										Codigo Producto
									</StyledTableCell>
									<StyledTableCell align="right">
										Precio de Venta
									</StyledTableCell>
									<StyledTableCell align="right">Acccion</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{objectModal.map((row, index) => (
									<StyledTableRow hover key={row.id}>
										<StyledTableCell component="th" scope="row">
											{row.id}
										</StyledTableCell>
										<StyledTableCell align="right">
											{row.producto_id}
										</StyledTableCell>
										<StyledTableCell align="right">
											{row.codigo}
										</StyledTableCell>
										<StyledTableCell align="right">
											{row.precio_sugerido}
										</StyledTableCell>
										<StyledTableCell align="right">
											<SelectInput
												source={mockData}
												name="status"
												value={row.statusUser}
												handleChange={e => changeStatusUser(index, e)}
											/>
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</Dialog>
		</div>
	);
}

const actions = {
	fetchCompras,
};

export function mapStateToProps(state) {
	const { id_compra_selected } = state.Bodega;
	return {
		id_compra_selected,
	};
}

export default connect(mapStateToProps, actions)(ModalDetallesCompras);
