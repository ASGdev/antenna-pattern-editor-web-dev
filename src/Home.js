import React from 'react';
import { Container, Button, Typography, GridList, GridListTile } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link } from "react-router-dom";

function Home() {
	const patternTilesData = [
		{
			title: "Pattern 1"
		},
		{
			title: "Pattern 2"
		}
	]
	
	return (
		<Container maxWidth="lg">
			<Alert severity="info">Click on a pattern to start edit it</Alert>
			<Button color="primary">Hello World</Button>;
			<GridList cellHeight={160} cols={4}>
				{patternTilesData.map((tile) => (
				  <GridListTile key={tile.title} cols={1}>
					<span>{tile.title}</span>
					<Link to="/edit">
						<Button variant="contained" color="primary">
						  Choose
						</Button>
					</Link>
					
				  </GridListTile>
				))}
		  </GridList>
			
		</Container>
	);
}

export default Home;