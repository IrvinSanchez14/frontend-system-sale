import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api';
const token =
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDE4Y2Q5ODAxYmY5M2RlZTcyYTNhMDVmNjUyY2FlYzFkMTBkOWU0MzViYmZiNDYxZDg0NTNiYmIyOWVhMTIwZWFkMzk2MjZiMWMxODY4ZTAiLCJpYXQiOjE1ODA4NDY3NjMsIm5iZiI6MTU4MDg0Njc2MywiZXhwIjoxNjEyNDY5MTYzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.VCgGP3BNQ3wNKdNu-ArWHYeFKkOX8iuTKaFQ67luRy9-EFDSq-biVKRNGfU9BeHNd7KKdKDLGi8s1jmZF5nyOsKLV68gJ_nRSx4I3a3yvMSGB_Jk_6xjbqFK3GAYgs4fY40nlq6Vv4YDBSooSbsggnWX4TxU8ozYNGkwRtR5ux_cFyYX9me3OyvV2M6FOOVPnGtBEgHzlqQMWoeP-OO9v7GHYE9PUm5kxgxMMbwnbN0ikJ4LQrretCsgaOQPwMT1_4TWXRBvRLKiq8hwmHHNM_nlZjnwKqs7aOSUoBXoCAue2dtyy3d8mkWgPmdiDIZd17RcPzazVv54iU9wOUrwvQCB8rNZivgLvT58Bzwn_W0-WwPmlX9nL2whaR-MIy93yCUmXp4CSc1dHCXKOxvA50R5Su2lTGsXqCYc1SDg5SOcOxa_OdPAaobFi0BVNn3utdjAYpi9dz05czzdMgVFH2lh_z6pl5qgKBwOtVCQC8Wo-W_x9-2q3u2KDpaQaYy-C4JmFEJVB6v1JB8RlcjvnPEDGkTDDIAMCUrLXUGJOT6hIFQLH5qW4hFSzFfBUfxgyK3iuib55CiCulunLET_QWH-j4PBtCxIOinl__hfXLi4WJb5qjgV27XENIhy6Cl5dbw7Dqpxe0QOuGeJVlXI7tMwMDYvUc8g3G3TZTsynP8';

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
				//Authorization: this.token,
			},
		};

		return axios.get(url, options);
	}

	createProduct(producto) {
		let url = this.baseURL + '/productos';
		//url_ = url.replace('{id}', encodeURIComponent('' + id_producto));
		let options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: this.token,
			},
		};

		return axios.post(url, producto, {
			headers: options,
		});
	}
}
