import React from 'react';
import { Container, Button, Paper, Tabs, Tab, TextField, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import TabPanel from './TabPanel'
import Test from './lib/Test'
import CustomTable from './CustomTable'
import PatternEditor from './PatternEditor'
import PatternEditorHelper from './PatternEditorHelper'

function Editor() {
	const [view, setView] = React.useState(0);
	const [newPointAngle, setNewPointAngle] = React.useState(0);
	const [newPointGain, setNewPointGain] = React.useState(0);
	const [localDataPoints, setLocalDataPoints] = React.useState([]);
	
	let test = new Test()
	let editorHelper = new PatternEditorHelper()

	const addData = () => {
		console.log("Adding data");
		test.addDataPoint({
			a: newPointAngle,
			g: newPointGain
		})
		setNewPointAngle(0);
		setNewPointGain(0);
		
		console.log(test.data)
		
		setLocalDataPoints(test.data);
	}
	
	const handleChange = (event, newValue) => {
		setView(newValue);
	};
	
	const handleNewPointAngle = (event) => {
		console.log("changing")
		setNewPointAngle(event.target.value);
	};
	const handleNewPointGain = (event) => {
		setNewPointGain(event.target.value);
	};
	
	const dataUpdatedHandler = () => {
		setLocalDataPoints(test.data)
	}
	
	
	return (
		<Container maxWidth="lg">
		
			<Button color="primary">Save</Button>
		
			<Paper square>
				<Tabs value={view} onChange={handleChange} centered>
					<Tab view="data" label="Data" />
					<Tab view="combined" label="Combined" />
					<Tab view="horizontal" label="Horizontal" />
					<Tab view="vertical" label="Vertical" />
					<Tab view="3d" label="3D" />
				</Tabs>
			</Paper>
			
			<TabPanel value={view} index={0}>
				<TextField value={newPointAngle || 0} onChange={handleNewPointAngle} label="Angle (°)" variant="outlined" type="number"/>
				<TextField value={newPointGain || 0} onChange={handleNewPointGain} label="Gain (dB)" variant="outlined" type="number"/>
				<Button variant="contained" color="primary" onClick={addData}>Add</Button>
				<CustomTable data={localDataPoints} view="combined" onDataUpdate={dataUpdatedHandler} />
			</TabPanel>
			<TabPanel value={view} index={1}>
				
			</TabPanel>
			<TabPanel value={view} index={2}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<PatternEditor data={localDataPoints} onDataUpdate={dataUpdatedHandler} patternRef={test} helperRef={editorHelper} view="h"/>
					</Grid>
					<Grid item xs={12}>
						<CustomTable data={localDataPoints} view="combined" onDataUpdate={dataUpdatedHandler} />	
					</Grid>
				</Grid>	
				
				
			</TabPanel>
			<TabPanel value={view} index={3}>
				<Alert severity="info">Feature in roadmap.</Alert>
			</TabPanel>
			<TabPanel value={view} index={4}>
				<Alert severity="info">Feature in roadmap.</Alert>
			</TabPanel>

			
			
			
		</Container>
	)
}

export default Editor;