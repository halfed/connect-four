import React from 'react';
import classes from './BoardSquares.css';

const BoardSquares = (props) => {
	let color = '';

	if(props.color === 'red') {
		color = classes.red;
	}else if(props.color === 'black') {
		color = classes.black;
	}else {
		color = '';
	}
	return (
		<div className={classes.BoardSquares}>
			<div className={classes.circle + ' ' + color} 
				onClick={() => props.playerClick(props.id, props.innerArr, props.outerArr)}>{props.value}</div>
		</div>
	);
}

export default BoardSquares;