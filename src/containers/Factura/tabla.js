import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ClearIcon from '@material-ui/icons/Clear';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { removeObject } from './Redux/actions';

const useStyles = makeStyles(theme => ({
	table: {
		minWidth: 700,
	},
}));

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: '#EAEAEA',
		color: '#666666',
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: '#fff',
		},
	},
}))(TableRow);

function TablaFactura(Props) {
	const { tableInformation, removeObject } = Props;
	const classes = useStyles();

	const removeItem = index => {
		alert(index);
		_.pullAt(tableInformation, index);
		console.log(tableInformation);
		removeObject(index);
	};

	return (
		<Fragment>
			{!_.isEmpty(tableInformation) ? (
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell>Producto</StyledTableCell>
								<StyledTableCell align="right">Precio</StyledTableCell>
								<StyledTableCell align="right">Cantidad</StyledTableCell>
								<StyledTableCell align="right">Descuento</StyledTableCell>
								<StyledTableCell align="right">
									Subtotal con IVA
								</StyledTableCell>
								<StyledTableCell align="right">
									Subtotal sin IVA
								</StyledTableCell>
								<StyledTableCell align="right">Eliminar</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{tableInformation.map((row, index) => (
								<StyledTableRow key={row.nombre_producto}>
									<StyledTableCell>{row.nombre_producto}</StyledTableCell>
									<StyledTableCell align="right">
										{row.precio_sugerido}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.cantidad_venta}
									</StyledTableCell>
									<StyledTableCell align="right">-</StyledTableCell>
									<StyledTableCell align="right">
										{parseFloat(
											row.precio_sugerido * row.cantidad_venta
										).toFixed(2)}
									</StyledTableCell>
									<StyledTableCell align="right">
										{parseFloat(
											(row.precio_sugerido * row.cantidad_venta) / 1.13
										).toFixed(2)}
									</StyledTableCell>
									<StyledTableCell align="right">
										<ClearIcon onClick={() => removeItem(index)} />
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : null}
		</Fragment>
	);
}

const actions = {
	removeObject,
};

export function mapStateToProps(state) {
	console.log('stateeeeeeee', state);
	const { tableInformation } = state.Factura;
	return {
		tableInformation,
	};
}

export default connect(mapStateToProps, actions)(TablaFactura);
