import React from 'react';
import axios from 'axios';
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

export default class Productos extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [ [ 'Loading Data...' ] ],
			loading: false,
			changeData: false,
			positionRow: 0,
			prueba: false,
			nombre: '',
			errors: '',
			errorMessage: '',
			open: false,
		};
	}

	async componentDidMount() {
		try {
			let productos = new ProductClient();
			await productos.getProduct().then((response) => {
				this.setState({ data: response.data, loading: true });
			});
		} catch (error) {
			console.log(error.message);
			this.setState({errorMessage:error.message, open:true})
		}
	}

	activateEdit = (position) => {
		alert('se activara');
		this.setState({ changeData: true, positionRow: position });
	};

	handleChange(event, id) {
		const { data } = this.state;
		data[id].nombre = event.target.value;
		this.setState({ data });
	}

	handleChangeChekBoc(event, id) {
		const { data } = this.state;
		data[id].status = event ? 'available' : 'unavailable';
		this.setState({ data });
	}

	doneIcon(id) {
		const { data } = this.state;
		axios.put(`http://127.0.0.1:8000/api/productos/${data[id].id}`, data[id]).then((response) => {
			if (response.status === 200) {
				this.setState({ changeData: false });
			}
		});
	}

	render() {
		const columns = [
			{
				label: 'Editar',
				name: 'id',
				options: {
					filter: false,
					sort: false,
					empty: true,
					customBodyRender: (value, tableMeta, updateValue) => {
						return this.state.changeData && tableMeta.rowIndex === this.state.positionRow ? (
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-evenly',
								}}>
								<Tooltip title={'Guardar registro'}>
									<IconButton
										onClick={() => this.doneIcon(tableMeta.rowIndex)}
										color="primary"
										aria-label="delete">
										<DoneIcon />
									</IconButton>
								</Tooltip>
								<IconButton
									onClick={() => this.setState({ changeData: false })}
									color="secondary"
									aria-label="delete">
									<CloseIcon />
								</IconButton>
							</div>
						) : (
							<IconButton
								onClick={() => this.activateEdit(tableMeta.rowIndex)}
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
						this.state.changeData && tableMeta.rowIndex === this.state.positionRow ? (
							<FormControlLabel
								value={value}
								control={
									<TextField
										value={this.state.data[tableMeta.rowIndex].nombre}
										onChange={(e) => {
											this.handleChange(e, tableMeta.rowIndex);
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
						return this.state.changeData && tableMeta.rowIndex === this.state.positionRow ? (
							<FormControlLabel
								label={
									this.state.data[tableMeta.rowIndex].status === 'available' ? `Activo` : `Inactivo`
								}
								value={this.state.data[tableMeta.rowIndex].status ? 'Activo' : 'Inactivo'}
								control={
									<Switch
										color="primary"
										checked={
											this.state.data[tableMeta.rowIndex].status === 'available' ? true : false
										}
										value={this.state.data[tableMeta.rowIndex].status}
									/>
								}
								onChange={(event) => {
									const checked = event.target.value === 'available' ? false : true;
									this.handleChangeChekBoc(checked, tableMeta.rowIndex);

									/*this.setState({ prueba: !checked });*/
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

		return this.state.loading ? (
			<MUIDataTable
				title={APP_TABLAS.TABLA_PRODUCTO}
				data={this.state.data}
				columns={columns}
				options={options}
			/>
		) : (
			<SnackBar message={this.state.errorMessage} type={'error'} open={this.state.open} />
		);
	}
}
