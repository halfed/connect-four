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

		let checkRow = 0;

		for(let a = 0; a < this.state.board[outer].length; a++) {
			if(this.state.board[outer][rowCountDown].value === 0) {
				checkRow++;
			}else {
				rowCountDown--;
			}
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

		let allPicked = this.state.board.map(function(squares) {
		  return squares.map(function(prop){return prop.value > 0})
		}).flat().every(
		  function(value, _, array){
		    return array[0] === value;
		  }
		);

 		const verticalWin = this.checkVertical(newBoard, this.state.currentPlayer.player, inner, outer);
 		const horizontalWin = this.checkHorizontal(newBoard, this.state.currentPlayer.player, inner, outer);
 		const forwardSlashWin = this.checkforwardSlash(newBoard, this.state.currentPlayer.player, inner, outer);
 		const backwardSlashWin = this.checkBackwardSlash(newBoard, this.state.currentPlayer.player, inner, outer);
	 		
 		if(verticalWin || horizontalWin || forwardSlashWin || backwardSlashWin) {
 			this.setState({
 				gameOver: true,
 			});
 		}else {
 			if(allPicked) {
 				this.setState({
	 				currentPlayer: {
						player: this.state.currentPlayer.player,
						color: 'Tie'
					},
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
	}

	checkVertical = (board, player, innerRow, outerCol) => {
		let fourStraight = 0, length = 0, start = 0, constant = 3, newRow = innerRow + 1, bottom = 0;

		if(innerRow < 3) {
			length = newRow + constant;
		}else if(innerRow === 3) {
			bottom = board[outerCol].length - newRow;
			length = newRow + bottom;
		}else {
			start = innerRow - constant;
			length = 6;
		}

		for(var i = start; i < length; i++) {
			if(board[outerCol][i].value === player) {
				fourStraight++;
			}
		}

		if(fourStraight === 4) {
			return true;
		}
		else {
			return false;
		}
	}

	checkHorizontal = (board, player, innerRow, outerCol) => {
		let fourStraight = 0, newCol = outerCol + 1, right = 0, left = 0, length = 0, start = 0;

		if(newCol < 5) {
			right = 3;
			length = newCol + right;
		}else {
			left = 3;
			start = outerCol - left;
			length = 7;
		}
		for(var i = start; i < length; i++) {
			if(board[i][innerRow].value === player) {
				fourStraight++;
			}
		}
		if(fourStraight === 4) {
			return true;
		}else {
			return false;
		}	
	}

	checkforwardSlash = (board, player, innerRow, outerCol) => {
		let fourStraight = 0, reducer = 1, length = 0, testOuterCol = 0, maxToRightCol = 6,
		maxToRightRow = 0, minToLeftRow = 5, minToLeftCol = 0, minLeftCount = 0, maxtoRightCount = 0,
		modifiedInnerRow = innerRow, modifiedOuterCol = outerCol, minleftInnerRowToUse = 0, testInnerRow = 0;
		
		//CHECK MIN TO LEFT LENGTH FOR START
		for(let i = 0; i < outerCol + 1; i++) {
			if(modifiedOuterCol === minToLeftCol || modifiedInnerRow === minToLeftRow) {
				testOuterCol = modifiedOuterCol;
				testInnerRow = modifiedInnerRow;
				break;
			}else {
				minLeftCount++;
				modifiedOuterCol--;
				modifiedInnerRow++;
			}
		}

		//RESET THE MODIFIERS
		modifiedInnerRow = innerRow, modifiedOuterCol = outerCol;
		//CHECK MAX TO RIGHT LENGTH
		for(var j = 0; j < 4; j++) {
			if(modifiedOuterCol === maxToRightCol || modifiedInnerRow === maxToRightRow) {
				if(maxtoRightCount === 0) {
					maxtoRightCount++;
				}
				break;
			}else {
				maxtoRightCount++;
				modifiedOuterCol++;
				modifiedInnerRow--;
			}
		}

		length = maxtoRightCount + minLeftCount;

		for(let k = 0; k < length; k++) {
			if(board[testOuterCol][testInnerRow].value === player) {
				fourStraight++;
			}else {
				if(fourStraight > 0) {
					fourStraight - reducer;
				}
			}
			testInnerRow--;
			testOuterCol++;
		}

		if(fourStraight === 4) {
			return true;
		}else {
			return false;
		}
	}

	checkBackwardSlash = (board, player, innerRow, outerCol) => {
		let fourStraight = 0, reducer = 1, length = 0, testOuterCol = 0, maxToRightCol = 6, 
		maxToRightRow = 5, minToLeftRow = 0, minToLeftCol = 0, minLeftCount = 0, 
		maxtoRightCount = 0, modifiedInnerRow = innerRow, modifiedOuterCol = outerCol, 
		minleftInnerRowToUse = 0, testInnerRow = 0;

		//CHECK MIN TO LEFT LENGTH FOR START
		for(let i = 0; i < outerCol + 1; i++) {
			if(modifiedOuterCol === minToLeftCol || modifiedInnerRow === minToLeftRow) {
				testOuterCol = modifiedOuterCol;
				testInnerRow = modifiedInnerRow;
				if(minToLeftRow === 0) {
					minLeftCount++;
				}
				break;
			}else {
				minLeftCount++;
				modifiedOuterCol--;
				modifiedInnerRow--;
			}
		}

		//RESET THE MODIFIERS
		modifiedInnerRow = innerRow, modifiedOuterCol = outerCol;
		// //CHECK MAX TO RIGHT LENGTH
		for(var j = 0; j < 4; j++) {
			if(modifiedOuterCol === maxToRightCol || modifiedInnerRow === maxToRightRow) {
				break;
			}else {
				maxtoRightCount++;
				modifiedOuterCol++;
				modifiedInnerRow++;
			}
		}

		length = maxtoRightCount + minLeftCount;

		for(let k = 0; k < length; k++) {
			if(board[testOuterCol][testInnerRow].value === player) {

				fourStraight++;
			}else {
				if(fourStraight > 0) {
					fourStraight - reducer;
				}
			}
			testInnerRow++;
			testOuterCol++;
		}

		if(fourStraight === 4) {
			return true;
		}else {
			return false;
		}
	}

	handleClickRestart = () => {
		this.setState({
			startGame: !this.state.startGame,
			gameOver: !this.state.gameOver,
			playerOne: '',
			playerTwo: '',
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