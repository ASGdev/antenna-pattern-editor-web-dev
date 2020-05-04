import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function CellEditor(props) {
	const { pointId, defaultValue, dataRef } = props;
	const [ editedPoint, setEditedPoint] = React.useState(props.pointId);
	const [ editedValue, setEditedValue] = React.useState(props.defaultValue);

	
	const handleChange = (event) => {
		setEditedValue(event.target.value)
	};
	
	const commitValue = () => {
		console.log("commiting value")
		
		
		props.onCancel();
	};
	
	const cancelValue = () => {
		props.onCancel();
	};

	return (
		<>
			<TextField id="outlined-basic" value={editedValue} onChange={handleChange} label="Angle (°)" size="small" type="number"/>
			<IconButton onClick={commitValue}>
				<CheckCircleIcon />
			</IconButton>
			<IconButton onClick={cancelValue}>
				<CancelIcon />
			</IconButton>
		</>
							
	)
}

export default CellEditor;