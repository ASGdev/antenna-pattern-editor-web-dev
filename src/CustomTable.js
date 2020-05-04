import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CellEditor from './CellEditor'

function CustomTable(props) {
	const { data, view, pattern, testRef } = props;
	const [ editableField, setEditableField] = React.useState("");
	const [ editedPoint, setEditedPoint] = React.useState("");
	
	const handleChange = (event, newValue) => {
		
	};
	
	function toggleEditable(e) {
		e.preventDefault();
		
		console.log(e.target)
		setEditableField(e.target)
		
		console.log(editableField)
		
	};
	
	function setEditor(point){
		console.log(point)
		
		setEditedPoint(point)
	}
	
	const cellEditorCancelHandler = () => {
		setEditedPoint("")
	}

	return (
		<TableContainer component={Paper}>
		  <Table>
			<TableHead>
			  <TableRow>
				{props.view === "combined" ? (
					<>
						<TableCell>Phi angle</TableCell>
						<TableCell>Theta angle</TableCell>
					</>
				) : (
					<TableCell>Phi</TableCell>
				)}
				
				<TableCell align="right">Gain</TableCell>
			  </TableRow>
			</TableHead>
			<TableBody>
				<TableRow>
				  <TableCell component="th" scope="row">
					<TextField id="outlined-basic" label="Outlined" label="Angle (°)" variant="outlined" type="number"/>
				  </TableCell>
				  <TableCell align="right"><TextField id="outlined-basic" label="Gain (dB)" variant="outlined" type="number"/></TableCell>
				</TableRow>
			  {props.data.map((d) => (
				<TableRow key={d.a}>
				  <TableCell component="th" scope="row">
					{d.a}
				  </TableCell>
				  <TableCell align="right" className="hover-initiator" data-point-id={d.id}>
					<div>
						{d.id == editedPoint ? (
							<CellEditor pointId={d.id} defaultValue={d.g} onCancel={cellEditorCancelHandler}/>
						):(
							<>
								{d.g}
								<span onClick={() => setEditor(d.id)}> hovered </span>
							</>
						)}
					</div>
					</TableCell>
				</TableRow>
			  ))}
			</TableBody>
		  </Table>
		</TableContainer>
	)
}

export default CustomTable;