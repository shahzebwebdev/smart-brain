import React from 'react'; 
import classes from './Rank.module.css'

const Rank = ({ name, entries }) => {
	return (
	<div className={classes.Container}>
		<div>
		{`${name}, your current rank is...`}
		</div>
		<div className={classes.Rank}>
		{entries}
		</div>
	</div>
	);
}

export default Rank;