import React from 'react';
import Tilt from 'react-tilt';
import classes from './Logo.module.css'
import logo from './logo.png'
 
const Logo = () => {
	return (
		<Tilt className={`Tilt ${classes.Tilt}`} options={{ max : 25 }} style={{ height: 80, width: 80 }} >
		 	<div className="Tilt-inner">
		 		<img className={classes.Logo} src={logo} alt="logo" />
		 	</div>
		</Tilt> 
	)
}

export default Logo;