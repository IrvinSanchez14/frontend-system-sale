import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import ResumenFactura from './resume';
import HeaderFactura from './header';
import TablaFactura from './tabla';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		marginTop: '34px',
		display: 'flex',
	},
	resumen: {
		padding: '30px',
	},
	btnAplicar: {
		margin: '8px',
		width: '99px',
		height: '36px',
	},
}));

function Factura(Props) {
	const { inventarioData } = Props;
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div>
				<Grid container spacing={3}>
					<HeaderFactura data={inventarioData} />
					<Grid item xs={12}>
						<TablaFactura />
					</Grid>
				</Grid>
				<Grid item xs={12} style={{ float: 'right' }}>
					<div style={{ display: 'flex' }}>
						<h3>DESCUENTO SOBRE EL TOTAL</h3>
						<input
							type="text"
							style={{ margin: '10px', width: '97px', height: '37px' }}
						/>
						<Button
							className={classes.btnAplicar}
							variant="contained"
							color="primary">
							APLICAR
						</Button>
					</div>
				</Grid>
			</div>
			<div className={classes.resumen}>
				<ResumenFactura />
			</div>
		</div>
	);
}

export function mapStateToProps(state) {
	const { inventarioData } = state.Caja;
	return {
		inventarioData,
	};
}

export default connect(mapStateToProps, null)(Factura);
