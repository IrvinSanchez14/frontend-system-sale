import React, { Fragment, useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import _ from 'lodash';
import { connect } from 'react-redux';

//import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ComprasClient, CompraDetallesClient } from 'services/logicServices';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import SelectInput from 'components/SelectInput';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Paper } from '@material-ui/core';
import Autocomplete, {
	createFilterOptions,
} from '@material-ui/lab/Autocomplete';

import { fetchProductos } from 'containers/Productos/Redux/actions';

const filter = createFilterOptions();

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: 200,
		},
	},
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
	},
	formControl: {
		padding: theme.spacing(1),
	},
	table: {
		minWidth: 650,
	},
	divContainer: {
		margin: '25px',
	},
}));

function Compras(Props) {
	const { fetchProductos, productoData } = Props;
	const classes = useStyles();
	const [value, setValue] = useState('');
	const [detallesCompras, setDetallesCompras] = React.useState([]);
	const [changeData, setChangeData] = React.useState(false);
	const [positionRow, setPositionRow] = React.useState(0);
	const [productoCompra, setProductoCompra] = React.useState({
		producto_id: 0,
		codigo: '',
		cantidad: 0,
		precio_compra: 0.0,
		precio_sugerido: 0.0,
		productoNombre: '',
	});
	const [cabeceraCompra, setCabeceraCompra] = React.useState({
		lote: '',
		tipo_compra: 0,
		sucursal_id: 0,
		usuario_id: 0,
		nombre_tipo: '',
	});

	useEffect(() => {
		fetchProductos();
	}, [fetchProductos]);

	const handleChange = event => {
		const { value, name } = event.target;
		setProductoCompra(prev => ({
			...prev,
			[name]: value,
		}));
		if (name === 'producto_id') {
			setProductoCompra(prev => ({
				...prev,
				productoNombre: event.nativeEvent.target.textContent,
			}));
		}
		if (name === 'tipo_compra') {
			setCabeceraCompra(prev => ({
				...prev,
				[name]: value,
			}));
			setCabeceraCompra(prev => ({
				...prev,
				nombre_tipo: event.nativeEvent.target.textContent,
			}));
		}
	};

	const handleChangeHead = event => {
		const { value, name } = event.target;
		setCabeceraCompra(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleChangedEditCodigo = (event, id) => {
		const { value } = event.target;
		const newArray = [...detallesCompras];
		newArray[id].codigo = value;

		setDetallesCompras(newArray);
	};

	const handleChangedEditProducto = (event, id) => {
		const { value } = event.target;
		const newArray = [...detallesCompras];
		newArray[id].producto_id = value;
		newArray[id].productoNombre = event.nativeEvent.target.textContent;

		setDetallesCompras(newArray);
	};

	const createObject = () => {
		const objectDetalle = {
			producto_id: value.id,
			codigo: productoCompra.codigo,
			cantidad: productoCompra.cantidad,
			precio_compra: productoCompra.precio_compra,
			precio_sugerido: productoCompra.precio_sugerido,
			productoNombre: value.nombre,
		};
		console.log(objectDetalle);
		setDetallesCompras(prev => [...prev, objectDetalle]);
		setProductoCompra({
			producto_id: 0,
			codigo: '',
			cantidad: 0,
			precio_compra: 0.0,
			precio_sugerido: 0.0,
			productoNombre: '',
		});
	};

	const createDetalle = async id => {
		let detalles = new CompraDetallesClient();
		const newObjectDetalles = detallesCompras.map(obj => ({
			...obj,
			compra_id: id,
		}));
		detalles.createCompraDetalle(newObjectDetalles).then(r => {
			console.log('finalizo', r);
			setDetallesCompras([]);
		});
	};

	const finishCompra = async () => {
		let compras = new ComprasClient();
		await compras.createCompra(cabeceraCompra).then(response => {
			console.log(response);
			return createDetalle(response.data[0].id);
		});
	};

	const activateEdit = position => {
		setChangeData(true);
		setPositionRow(position);
	};

	const columns = [
		{
			label: 'Producto',
			name: 'productoNombre',
			options: {
				filter: false,
				customBodyRender: (value, tableMeta, updateValue) =>
					changeData && tableMeta.rowIndex === positionRow ? (
						<FormControlLabel
							value={value}
							control={
								<SelectInput
									source={mockData}
									name={'producto_id'}
									value={detallesCompras[tableMeta.rowIndex].producto_id}
									handleChange={e =>
										handleChangedEditProducto(e, tableMeta.rowIndex)
									}
								/>
							}
						/>
					) : (
						value
					),
			},
		},
		{
			label: 'Codigo',
			name: 'codigo',
			options: {
				filter: false,
				customBodyRender: (value, tableMeta, updateValue) =>
					changeData && tableMeta.rowIndex === positionRow ? (
						<FormControlLabel
							value={value}
							control={
								<TextField
									value={detallesCompras[tableMeta.rowIndex].codigo}
									onChange={e => {
										handleChangedEditCodigo(e, tableMeta.rowIndex);
									}}
								/>
							}
						/>
					) : (
						value
					),
			},
		},
		{
			label: 'Cantidad',
			name: 'cantidad',
		},
		{
			label: 'Precio de Compra',
			name: 'precio_compra',
		},
		{
			label: 'Precio Sugerido',
			name: 'precio_sugerido',
		},
		{
			label: 'Editar',
			name: 'id',
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRender: (value, tableMeta, updateValue) => {
					return changeData && tableMeta.rowIndex === positionRow ? (
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-evenly',
							}}>
							<Tooltip title={'Guardar registro'}>
								<IconButton
									onClick={() => alert(tableMeta.rowIndex)}
									color="primary"
									aria-label="delete">
									<DoneIcon />
								</IconButton>
							</Tooltip>
							<IconButton
								onClick={() => setChangeData(false)}
								color="secondary"
								aria-label="delete">
								<CloseIcon />
							</IconButton>
						</div>
					) : (
						<IconButton
							onClick={() => activateEdit(tableMeta.rowIndex)}
							aria-label="delete"
							color="primary">
							<BorderColorIcon />
						</IconButton>
					);
				},
			},
		},
	];

	const options = {
		filter: false,
		search: false,
		print: false,
		download: false,
		viewColumns: false,
		customToolbar: null,
		responsive: 'stacked',
		pagination: false,
		textLabels: {
			body: {
				noMatch: 'No se encuentras datos',
			},
			filter: {
				all: 'Registros',
				title: 'Filtros',
				reset: 'Reset',
			},
			selectedRows: {
				text: 'registro seleccionado para eliminar',
				delete: 'Eliminar Registro',
				deleteAria: 'Deleted Selected Rows',
			},
			pagination: {
				next: 'siguiente pagina',
				previous: 'pagina anterior',
				rowsPerPage: 'Registros por Pagina:',
				displayRows: 'of',
			},
			toolbar: {
				search: 'Buscar',
				downloadCsv: 'Descargar archivo CSV',
				print: 'Imprimir',
				viewColumns: 'Ver Columnas',
				filterTable: 'Filtros de Tabla',
			},
		},
	};

	const mockData = [
		{ value: 1, text: 'GOW 2' },
		{ value: 2, text: 'Gran Turismo' },
	];

	const tipo = [
		{ value: 1, text: 'Nuevo' },
		{ value: 2, text: 'Usado' },
		{ value: 3, text: 'Taller' },
	];

	return (
		<div className={classes.divContainer}>
			<Grid container spacing={3}>
				<Paper className={classes.paper}>
					<Grid item xs={12}>
						<h1>Ingreso Compras</h1>
						<form className={classes.root} noValidate autoComplete="off">
							<TextField
								name="lote"
								onChange={handleChangeHead}
								value={cabeceraCompra.lote}
								label="Lote"
								variant="outlined"
							/>
							<SelectInput
								source={tipo}
								name="tipo_compra"
								value={cabeceraCompra.tipo_compra}
								handleChange={handleChange}
							/>
							<TextField
								name="sucursal_id"
								onChange={handleChangeHead}
								value={cabeceraCompra.sucursal_id}
								label="Sucursal"
								variant="outlined"
							/>
							<TextField
								name="usuario_id"
								onChange={handleChangeHead}
								value={cabeceraCompra.usuario_id}
								label="Usuario"
								variant="outlined"
							/>
						</form>
					</Grid>
					{cabeceraCompra.tipo_compra === 3 ? (
						<span>taller</span>
					) : (
						<Grid item xs={12}>
							<form className={classes.root} noValidate autoComplete="off">
								<Autocomplete
									value={value}
									onChange={(event, newValue) => {
										setValue(newValue);
									}}
									filterOptions={(options, params) => {
										const filtered = filter(options, params);
										return filtered;
									}}
									options={productoData}
									getOptionLabel={option => {
										if (typeof option === 'string') {
											return option;
										}
										if (option.inputValue) {
											return option.inputValue;
										}
										return option.nombre;
									}}
									renderOption={option => option.nombre}
									style={{ width: 830, backgroundColor: '#fff' }}
									freeSolo
									renderInput={params => (
										<TextField
											{...params}
											label="Producto"
											variant="outlined"
											fullWidth
										/>
									)}
								/>
								<TextField
									onChange={handleChange}
									name="codigo"
									label="Codigo"
									value={productoCompra.codigo}
									variant="outlined"
								/>
								<TextField
									onChange={handleChange}
									name="cantidad"
									label="Cantidad"
									value={productoCompra.cantidad}
									variant="outlined"
								/>
								<TextField
									onChange={handleChange}
									name="precio_compra"
									label="Precio de Compra"
									value={productoCompra.precio_compra}
									variant="outlined"
								/>
								<TextField
									onChange={handleChange}
									name="precio_sugerido"
									label="Precio Sugerido"
									value={productoCompra.precio_sugerido}
									variant="outlined"
								/>
								<Button
									onClick={createObject}
									style={{ marginTop: '20px' }}
									variant="contained"
									color="secondary">
									Agregar
								</Button>
							</form>
						</Grid>
					)}
				</Paper>
				{_.isEmpty(detallesCompras) ? null : (
					<Fragment>
						<Grid style={{ marginLeft: '-12px' }} item xs={12}>
							<MUIDataTable
								title={''}
								data={detallesCompras}
								columns={columns}
								options={options}
							/>
						</Grid>
						<Grid
							container
							alignItems="flex-start"
							justify="flex-end"
							direction="row">
							<Button
								onClick={finishCompra}
								color="primary"
								variant="contained">
								Finalizar
							</Button>
						</Grid>
					</Fragment>
				)}
			</Grid>
		</div>
	);
}

const actions = {
	fetchProductos,
};

export function mapStateToProps(state) {
	const { productoData } = state.Productos;
	return {
		productoData,
	};
}

export default connect(mapStateToProps, actions)(Compras);
