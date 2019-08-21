import React, {Component} from 'react';
import StartScreen from '../../components/StartScreen/StartScreen';
import OutCome from '../../components/OutCome/OutCome';
import BoardSquares from '../../components/BoardSquares/BoardSquares';
import classes from './PlayerBoard.css';

class PlayerBoard extends Component {
	state = {
		startGame: true,
		playerOne: '',
		playerTwo: '',
		winner: '',
		gameOver: false,
		currentPlayer: {
			player: '',
			color: ''
		},
		// board: [
		// 	[0,0,0,0,0,1],
		// 	[0,0,0,0,0,2],
		// 	[0,0,0,0,0,3],
		// 	[0,0,0,0,0,4],
		// 	[0,0,0,0,0,5],
		// 	[0,0,0,0,0,6],
		// 	[0,0,0,0,0,7],
		// ]
		board: [
			[{id: 1, value: 0, color: ''},{id: 2, value: 0, color: ''},{id: 3, value: 0, color: ''},{id: 4, value: 0, color: ''},{id: 5, value: 0, color: ''},{id: 6, value: 0, color: ''}],
			[{id: 7, value: 0, color: ''},{id: 8, value: 0, color: ''},{id: 9, value: 0, color: ''},{id: 10, value: 0, color: ''},{id: 11, value: 0, color: ''},{id: 12, value: 0, color: ''}],
			[{id: 13, value: 0, color: ''},{id: 14, value: 0, color: ''},{id: 15, value: 0, color: ''},{id: 16, value: 0, color: ''},{id: 17, value: 0, color: ''},{id: 18, value: 0, color: ''}],
			[{id: 19, value: 0, color: ''},{id: 20, value: 0, color: ''},{id: 21, value: 0, color: ''},{id: 22, value: 0, color: ''},{id: 23, value: 0, color: ''},{id: 24, value: 0, color: ''}],
			[{id: 25, value: 0, color: ''},{id: 26, value: 0, color: ''},{id: 27, value: 0, color: ''},{id: 28, value: 0, color: ''},{id: 29, value: 0, color: ''},{id: 30, value: 0, color: ''}],
			[{id: 31, value: 0, color: ''},{id: 32, value: 0, color: ''},{id: 33, value: 0, color: ''},{id: 34, value: 0, color: ''},{id: 35, value: 0, color: ''},{id: 36, value: 0, color: ''}],
			[{id: 37, value: 0, color: ''},{id: 38, value: 0, color: ''},{id: 39, value: 0, color: ''},{id: 40, value: 0, color: ''},{id: 41, value: 0, color: ''},{id: 42, value: 0, color: ''}]
		]
	}

	handleStartClick = (val) => {
		this.setState({
			playerOne: val,
			currentPlayer: {
					player: 1,
					color: val
			}
		});
		if(val === 'red') {
			this.setState({
				playerTwo: 'black',
			});
		} else {
			this.setState({
				playerTwo: 'red',
			});
		}

		this.setState({
			startGame: false
		});
	}

	handlePlayerClicked = (id, inner, outer) => {
		const curSquare = {
			id: id,
			value: this.state.currentPlayer.player,
			color: this.state.currentPlayer.color
		}
		const newBoard = this.state.board;
		newBoard[outer].splice(inner, 1, curSquare);
 		this.setState({
 			board: newBoard
 		});

 		const verticalWin = this.checkVertical(newBoard, this.state.currentPlayer.player);
 		const horizontalWin = this.checkHorizontal(newBoard, this.state.currentPlayer.player);
 		const forwardSlashWin = this.checkforwardSlash(newBoard, this.state.currentPlayer.player);
 		const backwardSlashWin = this.checkBackwardSlash(newBoard, this.state.currentPlayer.player);

 		console.log("vertical win " + verticalWin);
 		console.log("horizontal win " + horizontalWin);
 		console.log("forward slash win " + forwardSlashWin);
 		console.log("backward slash win " + backwardSlashWin);
 		if(verticalWin || horizontalWin || forwardSlashWin) {
 			this.setState({
 				gameOver: true,
 			});
 			alert();

 		} else {
 			if(this.state.currentPlayer.player === 1) {
				this.setState({
					currentPlayer: {
						player: 2,
						color: this.state.playerTwo
					}
				});
			}else {
				this.setState({
					currentPlayer: {
						player: 1,
						color: this.state.playerOne
					}
				});
			}
 		}
		
	}

	checkVertical = (board, player) => {
		
		for(let i = 0; i<board.length; i++) {
			let counter = 0;
			let fourStraight = 0;
			if(counter === 4) {
				return;
			}
			let innerBoard = board[i];
			for(let j = 0; j<innerBoard.length; j++) {
				if(innerBoard[j].value === player) {
					//console.log("counter in loop " + counter);
					counter++;
					fourStraight++;
					if(counter === 4 && fourStraight === 4) {
						return true;
					}
					//console.log("counter in loop after check " + counter);
				}else {
					if(fourStraight > 0) {
						fourStraight--;	
					}
				}
			}
		}
		return false;
	}

	checkHorizontal = (board, player) => {
		for(let i = 0; i<board.length; i++) {
			let counter = 0;
			let fourStraight = 0;
			let innerBoard = board[i];
			for(let j = 0; j<innerBoard.length; j++) {
				if(innerBoard[j].value === player) {
					//console.log("innerBoard value, row, column " + innerBoard[j].value + " " + j + " " + i);

					counter++;
					fourStraight++;
					

					let newInnerBoard = board[i+1];
					for(let k = i+1; k<board.length; k++) {
						console.log("board value column and row " + " " + k + " " + j + " " + board[k][j].value);
						if(counter === 4) {
							return;
						}
						if(board[k][j].value === player) {
							counter++;
							fourStraight++;
							console.log("found another one " + fourStraight);
							if(counter === 4 && fourStraight === 4) {
								return true;
							}
						}else {
							if(fourStraight > 0) {
								fourStraight--;	
							}
						}
						//console.log("counter in loop after check " + counter);
					}
				}
			}
		}
		return false;
	}

	checkforwardSlash = (board, player) => {
		for(let i = 0; i<board.length; i++) {
			let counter = 0;
			let fourStraight = 0;
			let innerBoard = board[i];
			for(let j = 0; j<innerBoard.length; j++) {
				//console.log("is this running");
				if(innerBoard[j].value === player) {
					console.log("innerBoard value, row, column " + innerBoard[j].value + " " + j + " " + i);

					counter++;
					fourStraight++;
					// let decreaser;
					// if(j-1 >= 0) {
					// 	decreaser = j-1;
					// }

					let decreaser = j-1;
					
					for(let k = i+1; k<board.length; k++) {
						
						console.log("board value column and row(decreaser) " + board[k][decreaser].value + " " + k + " " + decreaser);
						if(board[k][decreaser].value === player) {
							counter++;
							fourStraight++;
							//console.log("found another one " + board[k][k].value);
							console.log('fourStraight' + fourStraight);
							if(counter === 4 && fourStraight === 4) {
								return true;
							}
						}else {
							if(fourStraight > 0) {
								fourStraight--;	
							}
						}
						if(decreaser > 0) {
							decreaser--;	
						}
					}
				}
			}
		}
		return false;
	}

	checkBackwardSlash = (board, player) => {
		for(let i = 0; i<board.length; i++) {
			let counter = 0;
			let fourStraight = 0;
			let innerBoard = board[i];
			for(let j = 0; j<innerBoard.length; j++) {
				//console.log("is this running");
				if(innerBoard[j].value === player) {
					console.log("innerBoard value, row, column " + innerBoard[j].value + " " + j + " " + i);

					counter++;
					fourStraight++;
					// let decreaser;
					// if(j-1 >= 0) {
					// 	decreaser = j-1;
					// }

					let decreaser = j-1;
					
					for(let k = i-1; k>=0; k--) {
						console.log("board value column and row(decreaser) and column length " + board[k][decreaser].value + " " + k + " " + decreaser + " " + board.length);
						if(board[k][decreaser].value === player) {
							counter++;
							fourStraight++;
							//console.log("found another one " + board[k][k].value);
							console.log('fourStraight' + fourStraight);
							if(counter === 4 && fourStraight === 4) {
								return true;
							}
						}else {
							if(fourStraight > 0) {
								fourStraight--;	
							}
						}
						if(decreaser > 0) {
							decreaser--;	
						}
					}
				}
			}
		}
		return false;
	}

	handleClickRestart = () => {
		this.setState({
			startGame: !this.state.startGame,
			gameOver: !this.state.gameOver,
			board: [
					[{id: 1, value: 0, color: ''},{id: 2, value: 0, color: ''},{id: 3, value: 0, color: ''},{id: 4, value: 0, color: ''},{id: 5, value: 0, color: ''},{id: 6, value: 0, color: ''}],
					[{id: 7, value: 0, color: ''},{id: 8, value: 0, color: ''},{id: 9, value: 0, color: ''},{id: 10, value: 0, color: ''},{id: 11, value: 0, color: ''},{id: 12, value: 0, color: ''}],
					[{id: 13, value: 0, color: ''},{id: 14, value: 0, color: ''},{id: 15, value: 0, color: ''},{id: 16, value: 0, color: ''},{id: 17, value: 0, color: ''},{id: 18, value: 0, color: ''}],
					[{id: 19, value: 0, color: ''},{id: 20, value: 0, color: ''},{id: 21, value: 0, color: ''},{id: 22, value: 0, color: ''},{id: 23, value: 0, color: ''},{id: 24, value: 0, color: ''}],
					[{id: 25, value: 0, color: ''},{id: 26, value: 0, color: ''},{id: 27, value: 0, color: ''},{id: 28, value: 0, color: ''},{id: 29, value: 0, color: ''},{id: 30, value: 0, color: ''}],
					[{id: 31, value: 0, color: ''},{id: 32, value: 0, color: ''},{id: 33, value: 0, color: ''},{id: 34, value: 0, color: ''},{id: 35, value: 0, color: ''},{id: 36, value: 0, color: ''}],
					[{id: 37, value: 0, color: ''},{id: 38, value: 0, color: ''},{id: 39, value: 0, color: ''},{id: 40, value: 0, color: ''},{id: 41, value: 0, color: ''},{id: 42, value: 0, color: ''}]
				]
		});
	}

	render() {
		let startScreen, outCome, gameBoard = null;

		if(this.state.startGame) {
			startScreen = <StartScreen 
							clicked={this.handleStartClick} />
		} else {
			gameBoard = (
				<div>
					{this.state.board.map((boards, boardsIndex) => {
						return <div className={classes.test} key={boardsIndex}>{
									boards.map((squares, index) => {
										return <BoardSquares 
												key={squares.id}
												value={squares.value}
												id={squares.id}
												outerArr={boardsIndex}
												innerArr={index}
												color={squares.color}
												playerClick={this.handlePlayerClicked} />
								   })}
							   </div>
					})}
				</div>
			);
		}

		if(this.state.gameOver) {
			outCome = <OutCome
						winnerType={this.state.winner}
						reStart={this.handleClickRestart} />
		}
		return (
			<div>
				{startScreen}
				{gameBoard}
				{outCome}
			</div>
		);
	}
}

export default PlayerBoard;