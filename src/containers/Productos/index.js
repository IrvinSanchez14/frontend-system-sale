import React, { useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import CustomToolbarSelect from './CustomFooter';
import { ProductClient } from 'services/logicServices';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CustomToolbar from './CustomToolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorMessage from 'components/Error';
import { APP_ERRORS, APP_TABLAS } from 'texts/systemText';
import SnackBar from 'components/SnackBar';

function Productos(props) {
	const [ data, setData ] = React.useState([]);
	const [ loading, setLoading ] = React.useState(false);
	const [ changeData, setChangeData ] = React.useState(false);
	const [ positionRow, setPositionRow ] = React.useState(0);
	const [ errorMessage, setErrorMessage ] = React.useState('');
	const [ open, setOpen ] = React.useState(false);

	useEffect(() => {
		async function loadData() {
			try {
				let productos = new ProductClient();
				await productos.getProduct().then((response) => {
					setData(response.data);
					setLoading(true);
				});
			} catch (error) {
				setErrorMessage(error.message);
				setOpen(true);
			}
		}

		loadData();
	}, []);

	function activateEdit(position) {
		setChangeData(true);
		setPositionRow(position);
	}

	function handleChange(event, id) {
		const newArray = [ ...data ];
		newArray[id].nombre = event.target.value;

		setData(newArray);
	}

	function handleChangeChekBoc(event, id) {
		data[id].status = event ? 'available' : 'unavailable';
		setData(data);
	}

	async function doneIcon(id) {
		let productos = new ProductClient();
		await productos.updateProduct(data[id].id, data[id]).then((response) => {
			setChangeData(false);
		});
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
							<IconButton onClick={() => setChangeData(false)} color="secondary" aria-label="delete">
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
									value={data[tableMeta.rowIndex].nombre}
									onChange={(e) => {
										handleChange(e, tableMeta.rowIndex);
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
				filter: true,
			},
		},
		{
			label: 'Precio de Compra',
			name: 'precio_compra',
			options: {
				filter: false,
			},
		},
		{
			label: 'Precio Sugerido',
			name: 'precio_sugerido',
			options: {
				filter: true,
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
							label={data[tableMeta.rowIndex].status === 'available' ? `Activo` : `Inactivo`}
							value={data[tableMeta.rowIndex].status ? 'Activo' : 'Inactivo'}
							control={
								<Switch
									color="primary"
									checked={data[tableMeta.rowIndex].status === 'available' ? true : false}
									value={data[tableMeta.rowIndex].status}
								/>
							}
							onChange={(event) => {
								const checked = event.target.value === 'available' ? false : true;
								handleChangeChekBoc(checked, tableMeta.rowIndex);
								console.log('data[tableMeta.rowIndex].statu', data[tableMeta.rowIndex].status);
								console.log(data[tableMeta.rowIndex]);
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

	return loading ? (
		<MUIDataTable title={APP_TABLAS.TABLA_PRODUCTO} data={data} columns={columns} options={options} />
	) : (
		<div>
			<ErrorMessage message={APP_ERRORS.NO_DATA} />
			<SnackBar message={errorMessage} type={'error'} open={open} setOpen={setOpen} />
		</div>
	);
}

export default Productos;
