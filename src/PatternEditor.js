import React, { useRef, useEffect } from "react"
import { Grid, Tabs, Tab, FormGroup, FormControlLabel, Switch, Typography, Divider } from '@material-ui/core';
import * as d3 from "d3";
import TabPanel from './TabPanel'
import CustomColorPicker from './CustomColorPicker'

function PatternEditor(props) {
	const { patternRef, view, helperRef } = props;
	const [tabIndex, setTabIndex] = React.useState(0)
	const [isotropicOption, setIsotropicOption] = React.useState(props.patternRef.config[props.view].viz.polarPlot.isotropic.show)
	const [isotropicOptionLineColor, setIsotropicOptionLineColor] = React.useState(props.patternRef.config[props.view].viz.polarPlot.isotropic.lineColor)
	const svgHolder = useRef();

	const svg = d3.select(svgHolder.current);
	
	const addData = () => {
		console.log("Adding data");
		props.patternRef.addDataPoint({
			a: 22,
			g: 44
		})
		
		console.log(props.patternRef.data)
	}

	const handleTabChange = (e, newValue) => {
		setTabIndex(newValue);
	};
	
	const handleVizChange = (e) => {
		console.log("Modiying..." + e.target.name + " (" + e.target.checked + ")");
		switch (e.target.name) {
			case 'isotropicOption':
				props.patternRef.showIsotropic(props.view, e.target.checked)
				setIsotropicOption(props.patternRef.config[props.view].viz.polarPlot.isotropic.show)
			break;
			case 'isotropicOptionLineColor':
				console.log("colour");
				props.patternRef.configSetter[props.view].polarPlot.isotropic.setLineColor(e.target.value)
				setIsotropicOptionLineColor(props.patternRef.config[props.view].viz.polarPlot.isotropic.lineColor)
			break;
			default:
		}
		
		
		
	};

	
	useEffect(() => {
		console.log("updating svg...");
		
		setRAxis()
		setAAxis()
		
		// TODO : un-hardcode fixed size
		d3.select("#polarPlotContainer").attr("transform", "translate(" + 700 / 2 + "," + 500 / 2 + ")")
		
		if(props.patternRef.config[props.view].viz.polarPlot.isotropic.show){
			console.log("yes")
			d3.select("#isoCircle")
				.append("circle")
				.attr("r", props.helperRef.r(1))
				.attr("fill", "none")
				.attr("stroke-width", props.patternRef.config[props.view].viz.polarPlot.isotropic.lineWidth)
				.attr("stroke", props.patternRef.config[props.view].viz.polarPlot.isotropic.lineColor)
		} else {
			console.log("no");
			d3.select("#isoCircle").selectAll("circle").remove()
		}
		
		// draw points
		
		
	});
	
	const setRAxis = () => {
			var gr = d3.select("#rAxis")
				.selectAll("g")
				.data(props.helperRef.r.ticks(5).slice(1))
				.enter().append("g");

			gr.append("circle")
				.attr("r", props.helperRef.r)
				.attr("fill", "none")
				.attr("stroke", props.patternRef.config[props.view].viz.polarPlot.gAxis.lineColor)

			gr.append("text")
				.attr("y", function(d) { return -props.helperRef.r(d) - 4; })
				.attr("transform", "rotate(15)")
				.style("text-anchor", "middle")
				.text(function(d) { return d; });
	}
	
	const setAAxis = () => {
			var ga = d3.select("#aAxis")
				.selectAll("g")
				.data(d3.range(0, 360, 30))
				.enter().append("g")
				.attr("transform", function(d) { return "rotate(" + -d + ")"; });

			// todo hardcoded radius
			ga.append("line")
				.attr("x2", 250)
				.attr("fill", "none")
				.attr("stroke", props.patternRef.config[props.view].viz.polarPlot.aAxis.lineColor)

			// todo hardcoded radius
			ga.append("text")
				.attr("x", 250 + 6)
				.attr("dy", ".35em")
				.style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
				.attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (250 + 6) + ",0)" : null; })
				.text(function(d) { return d + "°"; });
	}
	
	

	return (
	
		<Grid container spacing={1}>
			<Grid item xs={8}>
				<svg ref={svgHolder} width={700} height={500} >
					<g id="polarPlotContainer">
						<g id="rAxis"></g>
						<g id="aAxis"></g>
						<g id="isoCircle"></g>
						<g id="patternPoints"></g>
						<g id="patternCurve"></g>
					</g>
				</svg>
			</Grid>
			<Grid item xs={4}>
				<Tabs
				  value={tabIndex}
				  onChange={handleTabChange}
				  indicatorColor="primary"
				  textColor="primary"
				  variant="fullWidth"
				>
				  <Tab label="Pattern features" />
				  <Tab label="Visualization features" />
				</Tabs>
				<TabPanel value={tabIndex} index={0}>
					<FormGroup row>
						<FormControlLabel control={<input type="color" value={isotropicOptionLineColor} onChange={handleVizChange} name="isotropicOptionLineColor" />}
							label="Show points"
						/>
					</FormGroup>
				</TabPanel>
				<TabPanel value={tabIndex} index={1}>
					<Typography variant="overline" display="block" gutterBottom>
						Isotropic reference
     				</Typography>
					<FormGroup row>
						<FormControlLabel control={<input type="color" value={isotropicOptionLineColor} onChange={handleVizChange} name="isotropicOptionLineColor" />}
							label="Isotropic line color"
						/>
						<FormControlLabel control={<Switch checked={isotropicOption} onChange={handleVizChange} name="isotropicOption" />}
						label="Show isotropic reference"
						/>
						<Divider />
					</FormGroup>
				</TabPanel>
			</Grid>
		</Grid>							
	)
}

export default PatternEditor;