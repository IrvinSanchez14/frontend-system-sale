import React from 'react';

function ErrorMessage(props) {
	const { message } = props;
	return (
		<div>
			<h1>{message}</h1>
		</div>
	);
}

export default ErrorMessage;
