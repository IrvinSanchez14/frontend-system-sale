import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Autocomplete, {
	createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import ErrorMessage from 'components/Error';
import { APP_ERRORS } from 'texts/systemText';
import { createObjectTable } from './Redux/actions';

const filter = createFilterOptions();

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
	},
	btnAgregar: {
		margin: '8px',
		width: '122px',
		float: 'right',
	},
	txtFactura: {
		width: '650px',
	},
	txtNumero: {
		margin: theme.spacing(1),
		width: '250px',
	},
	txtFecha: {
		margin: theme.spacing(1),
		width: '100px',
	},
}));

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'green',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'green',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'red',
			},
			'&:hover fieldset': {
				borderColor: 'yellow',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'green',
			},
		},
	},
})(TextField);

function HeaderFactura(Props) {
	const { createObjectTable, data, loading } = Props;
	const classes = useStyles();
	const [value, setValue] = useState('');
	const [cantidadVenta, setCantidadVenta] = useState(0);

	const x = [];

	useEffect(() => {}, []);

	const loadList = () => {
		if (!_.isEmpty(data)) {
			data.registro.forEach(dr => {
				dr.inventario.forEach(inv => {
					const information = {
						nombre_producto: inv.producto.nombre,
						cantidad: inv.cantidad,
						precio_sugerido: inv.precio_sugerido,
						producto_id: inv.producto_id,
						registro: inv.registro_id,
						lote: `00${inv.registro_id}`,
						combobox: `${inv.producto.nombre} Cantidad: ${inv.cantidad} Lote: 00${inv.registro_id}`,
						inventario_id: inv.id,
					};
					x.push(information);
				});
			});
		}
	};

	loadList();

	const createObjectFactura = async () => {
		value.cantidad_venta = parseInt(cantidadVenta);
		value.total_obj =
			parseFloat(value.precio_sugerido) * parseInt(cantidadVenta);
		value.cantidad_anterior = value.cantidad;
		value.cantidad_vendida = parseInt(cantidadVenta);
		value.cantidad_nueva = parseInt(value.cantidad) - parseInt(cantidadVenta);
		value.precio_original = value.precio_sugerido;
		value.precio_grabado = value.precio_sugerido;

		createObjectTable(value);
		setValue('');
		setCantidadVenta(0);
	};

	return (
		<Fragment>
			{loading ? (
				<Fragment>
					<Grid container spacing={3}>
						<Grid item xs>
							<Autocomplete
								value={value}
								onChange={(event, newValue) => {
									setValue(newValue);
								}}
								filterOptions={(options, params) => {
									const filtered = filter(options, params);
									return filtered;
								}}
								options={x}
								getOptionLabel={option => {
									if (typeof option === 'string') {
										return option;
									}
									if (option.inputValue) {
										return option.inputValue;
									}
									return option.combobox;
								}}
								renderOption={option => option.combobox}
								style={{ width: 830, backgroundColor: '#fff' }}
								freeSolo
								renderInput={params => (
									<TextField
										{...params}
										label="Buscar producto"
										variant="outlined"
										fullWidth
									/>
								)}
							/>
						</Grid>
						<Grid item xs>
							<TextField
								id="outlined-basic"
								name="cantidad_venta"
								label="Cantidad"
								variant="outlined"
								placeholder="Cantidad"
								type="number"
								onChange={e => setCantidadVenta(e.target.value)}
								value={cantidadVenta}
								style={{ backgroundColor: '#fff' }}
							/>
						</Grid>
						<Grid item xs>
							<Button
								onClick={createObjectFactura}
								className={classes.btnAgregar}
								variant="contained"
								color="primary">
								Agregar
							</Button>
						</Grid>
					</Grid>

					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<CssTextField
								className={classes.txtFactura}
								label="NOMBRE DE LA CUENTA"
								style={{ margin: 8 }}
								placeholder="Escribe un nombre"
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<CssTextField
								className={classes.txtNumero}
								label="NUMERO DE FACTURA"
								style={{ margin: 8 }}
								placeholder="0000000"
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<CssTextField
								className={classes.txtFecha}
								label="FECHA"
								style={{ margin: 8 }}
								placeholder="12/12/2020"
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Paper>
					</Grid>
				</Fragment>
			) : (
				<ErrorMessage message={APP_ERRORS.NO_DATA} />
			)}
		</Fragment>
	);
}

const actions = {
	createObjectTable,
};

export function mapStateToProps(state) {
	const { loading } = state.Caja;
	return {
		loading,
	};
}

export default connect(mapStateToProps, actions)(HeaderFactura);
