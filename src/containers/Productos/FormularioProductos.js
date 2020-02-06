import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Grid } from '@material-ui/core';

const onSubmit = async (values) => {
	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	await sleep(300);
	window.alert(JSON.stringify(values, 0, 2));
};
const validate = (values) => {
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

function FormAddProducto(props) {
	return (
		<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
			<Form
				onSubmit={onSubmit}
				validate={validate}
				render={({ handleSubmit, reset, submitting, pristine, values }) => {
					props.setObject(values);
					return (
						<form onSubmit={handleSubmit} noValidate>
							<Grid container alignItems="flex-start" spacing={2}>
								<Grid item xs={6}>
									<Field
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
										fullWidth
										required
										name="precio_compra"
										component={TextField}
										type="text"
										label="Precio de Compra"
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										fullWidth
										required
										name="precio_sugerido"
										component={TextField}
										type="text"
										label="Precio Sugerido de Venta"
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										fullWidth
										required
										name="categoria_id"
										component={TextField}
										type="text"
										label="Categoria"
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
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

export default FormAddProducto;
