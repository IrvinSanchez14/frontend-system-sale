import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import { connect } from 'react-redux';

import { Grid, MenuItem } from '@material-ui/core';

const onSubmit = async values => {
	const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
	await sleep(300);
	window.alert(JSON.stringify(values, 0, 2));
};
const validate = values => {
	const errors = {};
	if (!values.nombre) {
		errors.nombre = 'Required';
	}
	if (!values.descripcion) {
		errors.descripcion = 'Required';
	}
	if (!values.precio_compra) {
		errors.precio_compra = 'Required';
	}
	if (!values.precio_sugerido) {
		errors.precio_sugerido = 'Required';
	}
	if (!values.categoria_id) {
		errors.categoria_id = 'Required';
	}
	return errors;
};

function FormAddProducto(Props) {
	const { categoriaData } = Props;

	return (
		<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
			<Form
				onSubmit={onSubmit}
				validate={validate}
				render={({ handleSubmit, values }) => {
					Props.setObject(values);
					return (
						<form onSubmit={handleSubmit} noValidate>
							<Grid container alignItems="flex-start" spacing={2}>
								<Grid item xs={6}>
									<Field
										variant="outlined"
										fullWidth
										required
										name="nombre"
										component={TextField}
										type="text"
										label="Nombre Producto"
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										variant="outlined"
										name="descripcion"
										fullWidth
										required
										component={TextField}
										type="text"
										label="Descripccion"
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										style={{ width: '250px' }}
										name="categoria_id"
										label="Categoria"
										required
										component={Select}
										variant="outlined">
										<MenuItem value={0}>Selecciona item</MenuItem>
										{categoriaData.map(item => {
											return (
												<MenuItem key={item.id} value={item.id}>
													{item.nombre}
												</MenuItem>
											);
										})}
									</Field>
								</Grid>
								<Grid item xs={6}>
									<Field
										variant="outlined"
										fullWidth
										required
										name="usuario_id"
										component={TextField}
										type="text"
										label="Usuario"
									/>
								</Grid>
							</Grid>
						</form>
					);
				}}
			/>
		</div>
	);
}

export function mapStateToProps(state) {
	const { categoriaData } = state.Categorias;
	return {
		categoriaData,
	};
}

export default connect(mapStateToProps, null)(FormAddProducto);
