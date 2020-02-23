import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api';
const token =
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWMyMGU5M2EzNjVmNWE3MGU2ODUyYmViOWJhNGYwMDIzODhjMzRlYzlmMWY4ZDI2NThlNjQ0MzUwMGVlMWMxMDIwY2U1MmQzZTdkNTNjMTMiLCJpYXQiOjE1ODIxNDIxNDYsIm5iZiI6MTU4MjE0MjE0NiwiZXhwIjoxNjEzNzY0NTQ1LCJzdWIiOiIxMDAyIiwic2NvcGVzIjpbXX0.pMtqWVHZ_xS9kvPfkYTsYMuZpYmX1CrF5PvQftnphsykjBHpylvunqXRtiOoIouxHM1JQnGlWZCalfSE32epnQfPu7Xsufd90JGwg6SLU5-e3a2Lv_VNdJgeB87b3drRvVBx959k4Dif53TgjuBvVb6ub_vUa00XZpgreeTlWGda_9pmlpHUuiAk9FT82esq80ZAiQZm478FSG0aWMsEdNBUhVpyNgMa1FSrbiDCtTWmuBuJrDKkPeymWd70WkhJDP97aWGl4C7C4Vzt96TcJBDzk5YrvjQ4ZF5qB7FjkEYZQEzAXXNhYPIzOAtFBBbh5zaHfilqBbbhGE7hSVQysEkMxXi6aw3vkCwanwZbU14zg93_HeMIv2choDYWM3D-3lWiWss19kugJTdloWJvnW66tDS5ISC6vfP3-DSystnLWgZIMhFGYSvEf_Mk3Q22WI5parpRLA4RW2GACnoxtsXN9imSHYZXgEYkOzmBkfIcxJW-bWGeNlzcObbkrnCdXMrHqGREnEZFSAwTRO38GpdF-_oNxE6zns60zNGn-deX5dcq51KSEShpNONnGr9n68fXb0CQ91C3W5CQBCJ7qoo-LcdL0Ny3XNaAOtnuyy_elfC-CXc3GKOzgXejG8XSqHcZzJvVHpQYiyegTY3WftiRQfHLPBd7gNeStl8qqxY';

export class ComprasClient {
	constructor(http) {
		this.http = http;
		this.baseURL = baseURL;
		this.token = token;
	}

	createCompra(compra) {
		let url = this.baseURL + '/compras';
		let options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: this.token,
			},
		};

		return axios.post(url, compra, {
			headers: options,
		});
	}
}

export class CompraDetallesClient {
	constructor(http) {
		this.http = http;
		this.baseURL = baseURL;
		this.token = token;
	}

	createCompraDetalle(detalle) {
		let url = this.baseURL + '/compra_detalles';
		let options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: this.token,
			},
		};

		return axios.post(url, detalle, {
			headers: options,
		});
	}
}

export class ProductClient {
	constructor(http) {
		this.http = http;
		this.baseURL = baseURL;
		this.token = token;
	}

	getProduct() {
		let url = this.baseURL + '/productos';

		let options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: this.token,
			},
		};

		return axios.get(url, options);
	}

	createProduct(producto) {
		let url = this.baseURL + '/productos';
		let options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: this.token,
			},
		};

		return axios.post(url, producto, {
			headers: options,
		});
	}

	updateProduct(id_producto, producto) {
		let url = this.baseURL + '/productos/{id}';
		url = url.replace('{id}', encodeURIComponent('' + id_producto));
		let options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: this.token,
			},
		};

		return axios.put(url, producto, {
			headers: options,
		});
	}
}

export class InventarioSucursal {
	constructor(http) {
		this.http = http;
		this.baseURL = baseURL;
		this.token = token;
	}

	getInventarioSucursal(id_sucursal) {
		let url = this.baseURL + '/sucursales/{id_sucursal}/inventario_sucursal';
		url = url.replace('{id_sucursal}', encodeURIComponent('' + id_sucursal));
		let options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: this.token,
			},
		};

		return axios.get(url, options);
	}
}

export class FacturaClient {
	constructor(http) {
		this.http = http;
		this.baseURL = baseURL;
		this.token = token;
	}

	createHeader(header) {
		let url = this.baseURL + '/salidas_productos';
		let options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: this.token,
			},
		};

		return axios.post(url, header, {
			headers: options,
		});
	}

	createSalidaDetalle(id_salida, id_inventario, detalles) {
		let url =
			this.baseURL + '/salidas_productos/{id_salida}/transaccion_ventas';
		url = url.replace('{id_salida}', encodeURIComponent('' + id_salida));
		url = url.replace(
			'{id_inventario}',
			encodeURIComponent('' + id_inventario)
		);
		let options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: this.token,
			},
		};

		return axios.post(url, detalles, {
			headers: options,
		});
	}
}
