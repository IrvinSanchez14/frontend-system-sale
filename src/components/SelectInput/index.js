import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function SelectInput(Props) {
	const { source, name, style, value, handleChange } = Props;

	return (
		<Select
			variant="outlined"
			style={style}
			name={name}
			onChange={handleChange}
			value={value}>
			<MenuItem value={0}>Selecciona item</MenuItem>
			{source.map(item => {
				return (
					<MenuItem key={item.value} value={item.value}>
						{item.text}
					</MenuItem>
				);
			})}
		</Select>
	);
}

SelectInput.propTypes = {
	source: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	style: PropTypes.object,
	value: PropTypes.number.isRequired,
	handleChange: PropTypes.func.isRequired,
};

export default SelectInput;
