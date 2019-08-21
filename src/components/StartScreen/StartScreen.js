import React from 'react';
import classes from './StartScreen.scss';

const StartScreen = (props) => {
	return (
		<div className={classes.StartScreen}>
			<p>Player - 1 Please Choose your Color:</p>
			<div className={classes.buttonContainer}>
				<button className="button is-danger" onClick={() => props.clicked('red')}>RED</button>
				<button className="button is-black" onClick={() => props.clicked('black')}>BLACK</button>
			</div>
		</div>
	);
}

export default StartScreen;