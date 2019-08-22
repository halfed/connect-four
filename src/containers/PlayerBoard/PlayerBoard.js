import React, {Component} from 'react';
import StartScreen from '../../components/StartScreen/StartScreen';
import OutCome from '../../components/OutCome/OutCome';
import BoardSquares from '../../components/BoardSquares/BoardSquares';
import classes from './PlayerBoard.scss';

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
		board: [
			[{id: 1, value: 0, color: ''},{id: 2, value: 0, color: ''},{id: 3, value: 0, color: ''},{id: 4, value: 0, color: ''},{id: 5, value: 0, color: ''},{id: 6, value: 0, color: ''}],
			[{id: 7, value: 0, color: ''},{id: 8, value: 0, color: ''},{id: 9, value: 0, color: ''},{id: 10, value: 0, color: ''},{id: 11, value: 0, color: ''},{id: 12, value: 0, color: ''}],
			[{id: 13, value: 0, color: ''},{id: 14, value: 0, color: ''},{id: 15, value: 0, color: ''},{id: 16, value: 0, color: ''},{id: 17, value: 0, color: ''},{id: 18, value: 0, color: ''}],
			[{id: 19, value: 0, color: ''},{id: 20, value: 0, color: ''},{id: 21, value: 0, color: ''},{id: 22, value: 0, color: ''},{id: 23, value: 0, color: ''},{id: 24, value: 0, color: ''}],
			[{id: 25, value: 0, color: ''},{id: 26, value: 0, color: ''},{id: 27, value: 0, color: ''},{id: 28, value: 0, color: ''},{id: 29, value: 0, color: ''},{id: 30, value: 0, color: ''}],
			[{id: 31, value: 0, color: ''},{id: 32, value: 0, color: ''},{id: 33, value: 0, color: ''},{id: 34, value: 0, color: ''},{id: 35, value: 0, color: ''},{id: 36, value: 0, color: ''}],
			[{id: 37, value: 0, color: ''},{id: 38, value: 0, color: ''},{id: 39, value: 0, color: ''},{id: 40, value: 0, color: ''},{id: 41, value: 0, color: ''},{id: 42, value: 0, color: ''}]
		],
		rowCountDown: 5,
		timesClicked: 0
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
		let rowCountDown = 5;
		if(this.state.gameOver) return;
		this.setTotalClicks();

		//console.log("inner and outer " + inner + " " + outer);
		//console.log("id is " + id);
		let checkRow = 0;
		let test1 = this.state.board[outer].length;
		let test2 = this.state.board[outer][rowCountDown].value;
		let test3 = rowCountDown;

		//console.log("test1 is " + test1);
		//console.log("test2 is " + test2);
		//console.log("test3 is " + test3);

		for(let a = 0; a < this.state.board[outer].length; a++) {
			if(this.state.board[outer][rowCountDown].value === 0) {
				checkRow++;
			}else {
				// this.setState({
				// 	rowCountDown: rowCountDown--
				// });
				rowCountDown--
			}
			let test4 = rowCountDown;
			//console.log("test4 " + test4);
			//console.log("checkRow " + checkRow);
		}

		if(checkRow > 0) {
			let setInner = rowCountDown - inner;
			let setId = rowCountDown - inner;
			id += setId;
			inner += setInner;
		}


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

 		if(verticalWin || horizontalWin || forwardSlashWin || backwardSlashWin) {
 			this.setState({
 				gameOver: true,
 			});
 		}else {
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

	setTotalClicks =() => {

		this.setState({
			timesClicked: this.state.timesClicked + 1
		});
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
					counter++;
					fourStraight++;
					if(counter === 4 && fourStraight === 4) {
						return true;
					}
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
					counter++;
					fourStraight++;
					let newInnerBoard = board[i+1];
					for(let k = i+1; k<board.length; k++) {
						if(counter === 4) {
							return;
						}
						if(board[k][j].value === player) {
							counter++;
							fourStraight++;
							if(counter === 4 && fourStraight === 4) {
								return true;
							}
						}else {
							if(fourStraight > 0) {
								fourStraight--;	
							}
						}
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
				if(innerBoard[j].value === player) {
					counter++;
					fourStraight++;
					let decreaser = j-1;
					// if(j > 0) {
					// 	decreaser = j--;
					// }
					for(let k = i+1; k<board.length; k++) {
						console.log("k is " + k);
						console.log("decreaser is " + decreaser);
						if(board[k][decreaser].value === player) {
							counter++;
							fourStraight++;
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
				if(innerBoard[j].value === player) {
					counter++;
					fourStraight++;
					let decreaser = j-1;
					
					for(let k = i-1; k>=0; k--) {
						if(board[k][decreaser].value === player) {
							counter++;
							fourStraight++;
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
				],
			rowCountDown: 5
		});
	}

	render() {
		let startScreen, outCome, gameBoard = null;

		if(this.state.startGame) {
			startScreen = <StartScreen 
							clicked={this.handleStartClick} />
		} else {
			gameBoard = (
				<div className={classes.boardContainer + ' columns is-mobile'}>
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
						winnerType={this.state.currentPlayer.color}
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

/*
or(let k = i-1; k>=0; k--) {
> 240 | 	if(board[k][decreaser].value === player) {





	207 | 	if(board[k][decreaser].value === player) {
  208 | 		counter++;
*/