import React from 'react'; 
import classes from './FaceRecognition.module.css';


const FaceRecognition = ({ imgURL, box }) => {
	return (
		<div className={classes.Container}>
		<img id="inputimage" style={{width: '500px'}} src={imgURL} alt="img" />
		<div className={classes.BoundingBox} style={{top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow}}></div>
		</div>
	)
}

export default FaceRecognition;