import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ModalDetallesCompras from './modal';
import { idSelectedCompra } from 'containers/Bodega/Redux/actions';

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

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

function TableCompras(Props) {
	const { compraData, loading, idSelectedCompra } = Props;
	const [open, setOpen] = React.useState(false);
	const [detalle, setDetalles] = useState([]);
	const classes = useStyles();

	const loadDataModal = id => {
		setOpen(true);
		compraData.compras.forEach(cc => {
			if (cc.id === id) {
				idSelectedCompra(cc.id);
				setDetalles(cc.detalles);
			}
		});
	};

	return (
		<Fragment>
			{loading ? (
				<Fragment>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="customized table">
							<TableHead>
								<TableRow>
									<StyledTableCell>Lote</StyledTableCell>
									<StyledTableCell align="right">
										Tipo de Compra
									</StyledTableCell>
									<StyledTableCell align="right">Estado</StyledTableCell>
									<StyledTableCell align="right">
										Fecha Creado/Enviado
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{compraData.compras.map(row => (
									<StyledTableRow
										hover
										onClick={() => loadDataModal(row.id)}
										key={row.id}>
										<StyledTableCell component="th" scope="row">
											{row.lote}
										</StyledTableCell>
										<StyledTableCell align="right">
											{row.tipo_compra}
										</StyledTableCell>
										<StyledTableCell align="right">
											{row.status}
										</StyledTableCell>
										<StyledTableCell align="right">
											{row.updated_at}
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					{open ? (
						<ModalDetallesCompras
							open={open}
							setOpen={setOpen}
							information={detalle}
						/>
					) : null}
				</Fragment>
			) : null}
		</Fragment>
	);
}

const actions = {
	idSelectedCompra,
};

export function mapStateToProps(state) {
	const { compraData, loading } = state.Bodega;
	return {
		compraData,
		loading,
	};
}

export default connect(mapStateToProps, actions)(TableCompras);
