import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import PrintIcon from '@material-ui/icons/Print';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { FacturaClient } from 'services/logicServices';
import { fetchInventario } from 'containers/Caja/Redux/actions';
import { finishFactura } from 'containers/Factura/Redux/actions';

const useStyles = makeStyles(theme => ({
	paperResumen: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		width: '305px',
		height: '433px',
	},
	btnFinalizar: {
		margin: '8px',
		width: '100%',
		height: '36px',
		backgroundColor: '#6BAD00',
		'&:hover': {
			backgroundColor: 'red',
			color: '#FFF',
		},
	},
}));

function ResumenFactura(Props) {
	const { tableInformation, fetchInventario, finishFactura } = Props;
	const classes = useStyles();

	/*const subTotal = () => {
		const precioTot
	}*/

	const sendFactura = () => {
		let factura = new FacturaClient();

		const iva = (
			_.sumBy(tableInformation, 'total_obj') -
			_.sumBy(tableInformation, 'total_obj') / 1.13
		).toFixed(2);
		const headerFactura = {
			valor_venta: _.sumBy(tableInformation, 'total_obj').toFixed(2),
			valor_iva: iva,
			no_factura: '45963',
			usuario_id: 1,
			sucursal_id: 7,
			tipo_pago_id: 1,
		};

		factura.createHeader(headerFactura).then(response => {
			factura
				.createSalidaDetalle(response.data[0].id, 1, tableInformation)
				.then(sd => {
					console.log('xxxxxxxxxxxx', sd);
					fetchInventario();
					finishFactura();
				});
		});
	};

	return (
		<Paper className={classes.paperResumen}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					<Typography
						style={{ margin: '15px', color: '#666666', fontWeight: 700 }}
						variant="subtitle1"
						gutterBottom>
						RESUMEN
					</Typography>
				</div>
				<div
					style={{ display: 'flex' }}
					onClick={() => alert('mostrar impresion')}>
					<PrintIcon style={{ marginTop: '15px', color: '#3E50B4' }} />
					<Typography
						style={{
							margin: '10px',
							marginTop: '14px',
							color: '#3E50B4',
							fontWeight: 700,
						}}
						variant="subtitle1"
						gutterBottom>
						IMPRIMIR
					</Typography>
				</div>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					<Typography
						style={{
							margin: '15px',
							color: '#969696',
							fontWeight: 700,
							marginTop: '19px',
						}}
						variant="subtitle1"
						gutterBottom>
						SUBTOTAL
					</Typography>
				</div>
				<div>
					<Typography
						style={{
							margin: '10px',
							marginTop: '14px',
							color: '#313131',
							fontWeight: 400,
						}}
						variant="h6"
						gutterBottom>
						{!_.isEmpty(tableInformation)
							? `$${(_.sumBy(tableInformation, 'total_obj') / 1.13).toFixed(2)}`
							: `$0.00`}
					</Typography>
				</div>
			</div>
			<Divider />
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					<Typography
						style={{
							margin: '15px',
							color: '#969696',
							fontWeight: 700,
							marginTop: '19px',
						}}
						variant="subtitle1"
						gutterBottom>
						DESCUENTO
					</Typography>
				</div>
				<div>
					<Typography
						style={{
							margin: '10px',
							marginTop: '14px',
							color: '#DD0000',
							fontWeight: 400,
						}}
						variant="h6"
						gutterBottom>
						$0.00
					</Typography>
				</div>
			</div>
			<Divider />
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					<Typography
						style={{
							margin: '15px',
							color: '#969696',
							fontWeight: 700,
							marginTop: '19px',
						}}
						variant="subtitle1"
						gutterBottom>
						IVA
					</Typography>
				</div>
				<div>
					<Typography
						style={{
							margin: '10px',
							marginTop: '14px',
							color: '#313131',
							fontWeight: 400,
						}}
						variant="h6"
						gutterBottom>
						{!_.isEmpty(tableInformation)
							? `$${(
									_.sumBy(tableInformation, 'total_obj') -
									_.sumBy(tableInformation, 'total_obj') / 1.13
							  ).toFixed(2)}`
							: `$0.00`}
					</Typography>
				</div>
			</div>
			<Divider />
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					<Typography
						style={{
							margin: '15px',
							color: '#969696',
							fontWeight: 700,
							marginTop: '19px',
						}}
						variant="subtitle1"
						gutterBottom>
						TOTAL
					</Typography>
				</div>
				<div>
					<Typography
						style={{
							margin: '10px',
							marginTop: '14px',
							color: '#313131',
							fontWeight: 400,
						}}
						variant="h6"
						gutterBottom>
						{!_.isEmpty(tableInformation)
							? `$${_.sumBy(tableInformation, 'total_obj').toFixed(2)}`
							: `$0.00`}
					</Typography>
				</div>
			</div>
			<Button
				className={classes.btnFinalizar}
				variant="contained"
				color="primary"
				onClick={() => sendFactura()}>
				FINALIZAR
			</Button>
		</Paper>
	);
}

const actions = {
	fetchInventario,
	finishFactura,
};

export function mapStateToProps(state) {
	const { tableInformation } = state.Factura;
	return {
		tableInformation,
	};
}

export default connect(mapStateToProps, actions)(ResumenFactura);
