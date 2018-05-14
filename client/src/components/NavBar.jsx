import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
	return (
		<div class="navbar">
      <Link to="/bar">
        <button class="chartSelectionButton">Listens per artist</button>
      </Link>
      <Link to="/line">
        <button class="chartSelectionButton">Listens per week</button>
      </Link>
		</div>
	)
}

export default NavBar;