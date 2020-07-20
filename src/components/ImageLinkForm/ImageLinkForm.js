import React from 'react'; 
import classes from './ImageLinkForm.module.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
	<div>
		<div className={classes.Form}>
			<input className={classes.Input} type="text" placeholder="Enter url" onChange={onInputChange}/>
			<button className={classes.Button} onClick={onButtonSubmit}>Detect</button>
		</div>
	</div>
	);
}

export default ImageLinkForm;