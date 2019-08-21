import React from 'react';
import classes from './OutCome.scss';

const OutCome = (props) => {
	return (
		<div className={classes.OutCome + ' notification is-info'}>
			<h2><span className={classes.upperCase}>{props.winnerType}</span> {props.winnerType === "Tie" ? "Game!" : "Player Wins!"}</h2>
			<button className={'button is-medium' } onClick={props.reStart}>OK</button>
		</div>
	);	
}

export default OutCome;