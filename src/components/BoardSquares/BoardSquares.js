import React from 'react';
import classes from './BoardSquares.scss';

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
			<div className={classes.circle + ' ' + color + ' column'} 
				onClick={() => props.playerClick(props.id, props.innerArr, props.outerArr)}></div>
		</div>
	);
}

export default BoardSquares; 