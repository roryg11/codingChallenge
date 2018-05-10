import React from 'react';

const NavBar = (props) => {
	return (
		<div class="navbar">
			<button class="controlButton" onClick={() => {props.selectChart('Listens by artist')}}>Group by artist</button>
			<button class="controlButton" onClick={() => {props.selectChart('Listens per week')}}>Listens per week</button>
			<hr/>
			<button class="controlButton"> Organize by listen count</button>
			<button class="controlButton">Organize alphabetically</button>
			<button class="controlButton">Find in range</button>
		
				
		</div>
		)
}

export default NavBar;