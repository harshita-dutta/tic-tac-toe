import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./components/winning-combinations"
import GameOver from "./components/GameOver"

// -----------------------------------------
const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]
// -----------------------------------------
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}
// -----------------------------------------
function deriveActicePlayer(gameTurn) {
  let currPlayer = 'X'
  if (gameTurn.length>0 && gameTurn[0].player === 'X') {
    currPlayer = 'O'
  }
  return currPlayer
}
// -----------------------------------------
function deriveGameBoard(gameTurn) {
  let gameBoard = [...initialBoard.map(array => [...array])]
  
  for (const turn of gameTurn) {
    const { square, player } = turn
    const { row, col } = square

    gameBoard[row][col] = player
  }

  return gameBoard;
}
// -----------------------------------------
function deriveWinner(gameBoard, players) {
  let winner
  for (const combination of WINNING_COMBINATIONS) {
    const firstSqSym = gameBoard[combination[0].row][combination[0].column]
    const secondSqSym = gameBoard[combination[1].row][combination[1].column]
    const thirdSqSym = gameBoard[combination[2].row][combination[2].column]

    if (firstSqSym && firstSqSym === secondSqSym && secondSqSym === thirdSqSym) {
      winner = players[firstSqSym]

    }
  }

  return winner;
}
// -----------------------------------------
// -----------------------------------------

function App() {
  
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurn, setGameTurn] = useState([])

  // const [activePlayer, setActivePlayer] = useState('X')
  const activePlayer = deriveActicePlayer(gameTurn)
  const gameBoard = deriveGameBoard(gameTurn)

  const winner = deriveWinner(gameBoard, players)
  const hasDraw = (gameTurn.length===9 && !winner)
  
  function selectSqHandler(rowIndex, colIndex) {
    //setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X')
    setGameTurn(prevTurn => {
      
      let currPlayer = deriveActicePlayer(prevTurn)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currPlayer }, ...prevTurn]

      return updatedTurns
    })
  }

  function restartHandler() {
    setGameTurn([])
  }

  function playerNameChangeHandler(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers, 
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={playerNameChangeHandler} />
          <Player initialName = {PLAYERS.O} symbol = "O" isActive={activePlayer==='O'} onChangeName={playerNameChangeHandler}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={restartHandler}/>}
        <GameBoard onSelectSq={selectSqHandler} board={ gameBoard } />
      </div>
      <Log turns={gameTurn}/>
    </main>
  )
}

export default App
