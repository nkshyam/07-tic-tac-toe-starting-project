import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import GameOver from "./Components/GameOver";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./script/winning_combination";

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];



function deriveActivePlayer (preTurns) {
  let currentPlayer = 'X';

      if(preTurns.length > 0 && preTurns[0].player === 'X'){
        currentPlayer = 'O';
      }
      return currentPlayer;
}


function App() {

// const [activePlayer, setActivePlayer] = useState ('X')

 const [gameTurns, setGameTurns] = useState([])

 const activePlayer = deriveActivePlayer(gameTurns)

 let gameBoard = [...intialGameBoard.map(array => [...array])];

  for(const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;


    gameBoard [row][col] = player;
  }

  let winner = null;

 for(const combination of WINNING_COMBINATIONS){
    const firstSqrSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSqrSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSqrSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSqrSymbol && firstSqrSymbol === secondSqrSymbol && firstSqrSymbol === thirdSqrSymbol){
      winner = firstSqrSymbol;
    }
 }

 const hasDraw = gameTurns.length === 9 && !winner
  
  function handleSelectSqr (rowIndex, colIndex) {
    // setActivePlayer((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X')
    setGameTurns((preTurns ) => {
      let currentPlayer = deriveActivePlayer(preTurns);

      
      const updatedTurns = [
        {square:{row : rowIndex, col : colIndex}, player : currentPlayer} ,
         ...preTurns
        ];
        
      return updatedTurns
    } );
  } 

  function HandleRestart () {
    setGameTurns([]);
    console.log("its working");
  }

  return (
    <main>
      <div id="game-container" >
        <ol id="players"  className="highlight-player">
          <Player intialName="player 1" symbol = "X" isActive={activePlayer === 'X'} />
          <Player intialName="player 2" symbol = "O" isActive={activePlayer === 'O'} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={HandleRestart}/>}
        <GameBoard onSelectSqr = {handleSelectSqr} board = {gameBoard} />
      </div>
      <Log  turns = {gameTurns}/>
    </main>
  );
}

export default App;
