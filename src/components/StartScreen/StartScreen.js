import React from 'react';

const StartScreen = (props) => {
	return (
		<div>
			<p>Player - 1 Please Choose your Color:</p>
			<div>
				<button onClick={() => props.clicked('red')}>RED</button>
				<button onClick={() => props.clicked('black')}>BLACK</button>
			</div>
		</div>
	);
}

export default StartScreen;