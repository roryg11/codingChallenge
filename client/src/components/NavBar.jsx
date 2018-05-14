import React from 'react';

const NavBar = (props) => {
  return (
    <div class="navbar">
      <button class="chartSelectionButton" onClick={() => {props.selectChart('Listens by artist')}}>Listens per artist</button>
      <button class="chartSelectionButton" onClick={() => {props.selectChart('Listens per week')}}>Listens per week</button>
    </div>
  )
}

export default NavBar;