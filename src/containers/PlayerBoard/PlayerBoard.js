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

	checkVertical = (board, player, playersRow, playersCol) => {
		let fourStraight = 0, maxUpperRow = 0, maxLowerRow = 5, startRow = 0,
		lowerCount = 0, upperCount = 0, length = 0, maxConstant = 3,
		modifiedPlayersRow = playersRow;

		//CHECK FOR A UPPER WIN
		for(var i = 0; i < maxConstant; i++) {
			if(modifiedPlayersRow === maxUpperRow || upperCount === maxConstant) {
				if(upperCount === 0) {
				upperCount++;
				}
				break;
			}else {
				modifiedPlayersRow--;
				upperCount++;
			}
			startRow = modifiedPlayersRow;
		}

		//CHECK FOR A LOWER WIN
		//RESET MOFIFIED VALUE BACK TO PLAYERS SELECTED COLUMN
		modifiedPlayersRow = playersRow;
		for(var j = 0; j < maxConstant; j++) {
			if(modifiedPlayersRow === maxLowerRow || lowerCount === maxConstant) {
				if(lowerCount === 0) {
					lowerCount++
					
				}
				break;
			}else {
				lowerCount++;
				modifiedPlayersRow++
			}
		}

		length = upperCount + lowerCount;
		if(playersRow < maxUpperRow ) {
			length++;
		}else if(playersRow !== maxLowerRow) {
			length++;
		}

		for(var k = 0; k < length; k++) {
			if(board[playersCol][startRow].value === player) {
				fourStraight++;
				if(fourStraight === 4) {
					break;
				}
			}else {
				fourStraight = 0;

			}
			startRow++;
		}

		if(fourStraight === 4) {
			return true;
		}else {
			return false;
		}
	}

	checkHorizontal = (board, player, playersRow, playersCol) => {
		let fourStraight = 0, maxLeftCol = 0, maxRightCol = 6, startCol = 0,
		rightCount = 0, leftCount = 0, length = 0, maxConstant = 3,
		modifiedPlayersCol = playersCol;

		//CHECK FOR A WIN TO THE LEFT
		for(var i = 0; i < maxConstant; i++) {
			if(modifiedPlayersCol === maxLeftCol || leftCount === maxConstant) {
				leftCount++;
				startCol = modifiedPlayersCol;
				break;
			}else {
				modifiedPlayersCol--;
				leftCount++;
			}
		}

		//CHECK FOR A WIN TO THE RIGHT
		//RESET MOFIFIED VALUE BACK TO PLAYERS SELECTED COLUMN
		modifiedPlayersCol = playersCol;
		for(var j = 0; j < maxConstant; j++) {
			if(modifiedPlayersCol === maxRightCol || rightCount === maxConstant) {
				
				if(rightCount !== 0) {
					rightCount++;
				}
				break;
			}else {
				rightCount++;
				modifiedPlayersCol++
			}
		}

		length = leftCount + rightCount;
		if(playersCol > maxLeftCol) {
			length++;
		}else if(playersCol < maxRightCol) {
			length++;
		}

		for(var k = 0; k < length; k++) {
			if(board[startCol][playersRow].value === player) {
				fourStraight++;
				if(fourStraight === 4) {
					break;
				}
			}else {
				fourStraight = 0;
			}
			startCol++;
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
				if(fourStraight === 4) {
					break;
				}
			}else {
				//RESET COUNTER
				fourStraight = 0;
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
				if(fourStraight === 4) {
					break;
				}
			}else {
				fourStraight = 0;
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