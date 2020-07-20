import React from 'react'; 
import classes from './Navigation.module.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn) {
			return (
				<nav className={classes.Nav}>
				<p onClick={() => onRouteChange('signout')} className={classes.NavChild}>Sign out</p>
				</nav>
			)
		} else {
				return (
				<nav className={classes.Nav}>
				<p onClick={() => onRouteChange('signin')} className={classes.NavChild}>Sign in</p>
				<p onClick={() => onRouteChange('register')} className={classes.NavChild}>Register</p>
				</nav>
				)
		}
	}

export default Navigation;