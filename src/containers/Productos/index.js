import React, { useEffect, Fragment, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { connect } from 'react-redux';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import ErrorMessage from 'components/Error';
import { APP_ERRORS, APP_TABLAS } from 'texts/systemText';
import SnackBar from 'components/SnackBar';
import CustomToolbarSelect from './CustomFooter';
import CustomToolbar from './CustomToolbar';
import {
	fetchProductos,
	editProductosStatus,
	editProductosNombre,
	editProductosDescripcion,
	updateProductos,
} from './Redux/actions';
import { fetchCategorias } from 'containers/Categoria/Redux/actions';

function Productos(Props) {
	const {
		fetchProductos,
		productoData,
		loading,
		fetchCategorias,
		editProductosStatus,
		editProductosNombre,
		editProductosDescripcion,
		updateProductos,
	} = Props;
	const [changeData, setChangeData] = React.useState(false);
	const [positionRow, setPositionRow] = React.useState(0);
	const [errorMessage, setErrorMessage] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const [typeToast, setTypeToast] = useState('');

	useEffect(() => {
		async function loadData() {
			try {
				fetchProductos();
				fetchCategorias();
			} catch (error) {
				setErrorMessage(error.message);
				setOpen(true);
			}
		}

		loadData();
	}, [fetchProductos, fetchCategorias]);

	function activateEdit(position) {
		setChangeData(true);
		setPositionRow(position);
	}

	function handleChange(event, id) {
		editProductosNombre(event.target.value, id);
	}

	function handleChangeDescripcion(event, id) {
		editProductosDescripcion(event.target.value, id);
	}

	function handleChangeChekBoc(event, id) {
		editProductosStatus(event ? 'disponible' : 'no disponible', id);
	}

	async function doneIcon(id) {
		await updateProductos(productoData[id], productoData[id].id);
		setChangeData(false);
		setErrorMessage(`Status:200 Registro Modificado`);
		setTypeToast('success');
		setOpen(true);
	}

	const columns = [
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
									onClick={() => doneIcon(tableMeta.rowIndex)}
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
		{
			label: 'Nombre',
			name: 'nombre',
			options: {
				filter: false,
				customBodyRender: (value, tableMeta, updateValue) =>
					changeData && tableMeta.rowIndex === positionRow ? (
						<FormControlLabel
							value={value}
							control={
								<TextField
									value={productoData[tableMeta.rowIndex].nombre}
									onChange={e => {
										handleChange(e, productoData[tableMeta.rowIndex].id);
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
			label: 'Descripcion',
			name: 'descripcion',
			options: {
				filter: false,
				customBodyRender: (value, tableMeta, updateValue) =>
					changeData && tableMeta.rowIndex === positionRow ? (
						<FormControlLabel
							value={value}
							control={
								<TextField
									value={productoData[tableMeta.rowIndex].descripcion}
									onChange={e => {
										handleChangeDescripcion(
											e,
											productoData[tableMeta.rowIndex].id
										);
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
			label: 'Estado',
			name: 'status',
			options: {
				filter: true,
				customBodyRender: (value, tableMeta, updateValue) => {
					return changeData && tableMeta.rowIndex === positionRow ? (
						<FormControlLabel
							label={
								productoData[tableMeta.rowIndex].status === 'disponible'
									? `Activo`
									: `Inactivo`
							}
							value={
								productoData[tableMeta.rowIndex].status ? 'Activo' : 'Inactivo'
							}
							control={
								<Switch
									color="primary"
									checked={
										productoData[tableMeta.rowIndex].status === 'disponible'
											? true
											: false
									}
									value={productoData[tableMeta.rowIndex].status}
								/>
							}
							onChange={event => {
								const checked =
									event.target.value === 'disponible' ? false : true;
								handleChangeChekBoc(
									checked,
									productoData[tableMeta.rowIndex].id
								);
							}}
						/>
					) : (
						value
					);
				},
			},
		},
	];

	const options = {
		pagination: false,
		filter: true,
		filterType: 'dropdown',
		responsive: 'stacked',
		textLabels: {
			body: {
				noMatch: 'Sorry we could not find any records!',
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
		customToolbar: () => {
			return <CustomToolbar />;
		},
		customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
			<CustomToolbarSelect
				selectedRows={selectedRows}
				displayData={displayData}
				setSelectedRows={setSelectedRows}
			/>
		),
	};

	const alertToast = () => (
		<div>
			<SnackBar
				message={errorMessage}
				type={typeToast}
				open={open}
				setOpen={setOpen}
			/>
		</div>
	);

	return loading ? (
		<Fragment>
			<MUIDataTable
				title={APP_TABLAS.TABLA_PRODUCTO}
				data={productoData}
				columns={columns}
				options={options}
			/>
			{alertToast()}
		</Fragment>
	) : (
		<Fragment>
			<ErrorMessage message={APP_ERRORS.NO_DATA} />
			{alertToast()}
		</Fragment>
	);
}

const actions = {
	fetchProductos,
	fetchCategorias,
	editProductosStatus,
	editProductosNombre,
	editProductosDescripcion,
	updateProductos,
};

export function mapStateToProps(state) {
	const { productoData, loading, updateProducto } = state.Productos;
	return {
		productoData,
		loading,
		updateProducto,
	};
}

export default connect(mapStateToProps, actions)(Productos);
