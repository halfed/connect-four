import React from 'react';

const OutCome = (props) => {
	return (
		<div>
			<p>{props.winnerType} {props.winnerType === "Tie" ? "Game!" : "Player Wins!"}</p>
			<button onClick={props.reStart}>OK</button>
		</div>
	);	
}

export default OutCome;