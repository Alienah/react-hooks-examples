import React, {useState, useEffect} from 'react';

import './App.scss';

const initMatrix= [];

function App() {
  const [matrix, setMatrix] = useState(initMatrix);
  const [matrixSize, setMatrixSize] = useState(3);
  const [currentPlayer, setCurrentPlayer] = useState('o');
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [winner, setWinner] = useState(false);
  const [reset, setReset] = useState(false);
  const [full, setFull] = useState(false);

  useEffect(() => {
    setWinner(false);
    setFull(false);
    setSelectedColumn(null);
    setSelectedRow(null);
    const row = new Array(matrixSize).fill(null);

    const tempMatrix = [];

    for (let index = 0; index < matrixSize; index++) {
      // Como no quiero que me haga el array tres veces, uso una copia con spread operator y hago que lo haga una única vez por fila
      tempMatrix.push([...row]);
      
    }
    setMatrix(tempMatrix);

    // Vamos a hacer que se contruya un nuevo matrix dependiendo de ese estado reset
  }, [reset]);

  function squareClickhadle(r, c) {
    if(!matrix[r][c] && !winner && !full) {
      // Para guardar cada movimiento
      setSelectedColumn(c);
      setSelectedRow(r);

      // Para alternar jugadores
      let nextPlayer = currentPlayer === 'x' ? 'o' : 'x';
      setCurrentPlayer(nextPlayer);

      // Para meter los valores x o o en el matrix
      const matrixCopy = [...matrix];
      matrixCopy[r][c] = nextPlayer;
      setMatrix(matrixCopy);
      isFull();
    }
  }

  function isWinner() {
    let vertical = true;
    let horizontal = true;
    let diagonal1 = true
    let diagonal2 = true

    if(selectedColumn === null || selectedRow === null) {
      return;
    }

    for(let i = 0; i < matrixSize; i++) {
      // check the rows for that column
      if(matrix[i][selectedColumn] !== currentPlayer) {
        vertical = false;
      }
      // check the columns for that row
      if(matrix[selectedRow][i] !== currentPlayer) {
        horizontal = false;
      }
      // check diagonal 1
      if(matrix[i][i] !== currentPlayer) {
        diagonal1 = false;
      }
      // check diagonal 2
      if(matrix[i][matrixSize - i - 1] !== currentPlayer) {
        diagonal2 = false;
      }
    }

    if(vertical || horizontal || diagonal1 || diagonal2) {
      setWinner(currentPlayer);
    }
  }

  // Iré comprobando con cada actualización el resultado para ver si ha ganado alguien
  useEffect(() => {
    if (!winner) {
      isWinner();
    }
  })

  function resetGame() {
    setReset(!reset)
  }

  // Compruebo si el matrix está completo
  function isFull() {
    const m = matrix.filter((column) => {
      const columnWithFilledSquares = column.reduce((acc, i) => {
        if (i) {
          acc.push([...i])
        }
        return acc;
      },[])
      if (columnWithFilledSquares.length < matrixSize) {
        return columnWithFilledSquares;
      }
    })
    let isFull = (m.length === 0);
    setFull(isFull);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic tac toe Game</h1>
        <button onClick={resetGame} className="button">Reset Game</button>
        <div className="matrix">
          {
            matrix.map((item, c) => (
              <div className="column">
                {
                  item.map((row, r) => (
                    <div 
                      onClick={() => squareClickhadle(r, c)}
                      className="square">
                        {matrix[r][c]}
                      </div>
                  ))
                }
              </div>
            ))
          }
        </div>
        <h2>{winner ? `Player ${currentPlayer} has won!`: ''}</h2>
        <h2>{full && !winner ? `Ohhh There is a matches tie... Try it again!`: ''}</h2>
      </header>
    </div>
  );
}

export default App;