import React from 'react';

const NavBar = (props) => {
	return (
		<div class="navbar">
			<button onClick={() => {props.selectChart('Listens by artist')}}>Group by artist</button>
			<br/>
			<button onClick={() => {props.selectChart('Listens per week')}}>Listens per week</button>
				
		</div>
		)
}

export default NavBar;