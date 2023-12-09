export default function GameBoard({ onSelectSq, board }) {
    // const [board, setBoard] = useState(initialBoard);
    // function selectSqHandler(rowIndex, colIndex) {
    //     setBoard((prevBoard) => {
    //         const updatedBoard = [...prevBoard.map(innerArray => [...innerArray])]
    //         updatedBoard[rowIndex][colIndex] = activeSymbol
    //         return updatedBoard
    //     })
    //     onSelectSq()
    // }
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>
                            <li key={colIndex}>
                                <button onClick={() => onSelectSq(rowIndex, colIndex)} disabled={playerSymbol!== null}>
                                    {playerSymbol}
                                </button>
                            </li>
                        )}
                    </ol>
                </li>
            )}
        </ol>
    )
}