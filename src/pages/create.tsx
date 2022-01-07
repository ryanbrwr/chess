import React, { useEffect, useState } from "react";
// Lines 5-8: Bring in chessboard and chess.js stuff
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import { saveLine } from "../utils/game/save";
const Chess = require("chess.js");


const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    // Set initial state to FEN layout
    new Chess()
  );


  const [fen, setFen] = useState(chess.fen());
  const [color, setColor] = useState<'white' | 'black'>('white')

  // useEffect(() => {
  //   console.log(getGames())
  // }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (sequence.color === "b") {
  //       chess.move(sequence.moves[0])
  //       setFen(chess.fen())
  //       setMoveNum(moveNum + 1)
  //     }
  //   }, 300)
  // })


  // Logic for the setting up the random computer move.
  const handleMove = (move: ShortMove) => {
    let newMove = chess.move(move)
    if (newMove) {
      setFen(chess.fen())
    }
  }

  const clearBoard = () => {
    chess.reset()
  }

  return (
    <div className="h-screen">
      <Chessboard
        width={400}
        position={fen}
        orientation={color}
        // onDrop prop tracks every time a piece is moved.
        // The rest is handled in the the handleMove function.
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            // This promotion attribute changes pawns to a queen if they reach the other side of the board.
            promotion: "q",
          })
        }
      />
      <button onClick={() => {setColor(color === 'white' ? 'black': 'white')}}>flip board</button>
      <button onClick={() => {
        saveLine(chess.pgn())
        clearBoard()
        setFen(chess.fen())
      }}>save variation</button>
      <button onClick={() => {
  
      }}>back</button>
      <p>{chess.pgn()}</p>
    </div>
  );
};
export default App;