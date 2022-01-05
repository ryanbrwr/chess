import React, { useEffect, useState } from "react";
import { sequence } from './giuco'
import "./App.css";
import Timer from "react-compound-timer";
// Lines 5-8: Bring in chessboard and chess.js stuff
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import axios from "axios";
import {getGames} from './utils/chesscom/games'
const Chess = require("chess.js");


const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    // Set initial state to FEN layout
    new Chess()
  );


  const [fen, setFen] = useState(chess.fen());
  const [moveNum, setMoveNum] = useState(0)

  useEffect(() => {
    console.log(getGames())
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (sequence.color === "b") {
        chess.move(sequence.moves[0])
        setFen(chess.fen())
        setMoveNum(moveNum + 1)
      }
    }, 300)
  })


  // Logic for the setting up the random computer move.
  const handleMove = (move: ShortMove) => {
    let newMove = chess.move(move)
    if (newMove) {
      let moveString = newMove.san
      console.log(moveString)
      if (moveString == sequence.moves[moveNum]) {
        setFen(chess.fen())

        let otherMove = chess.move(sequence.moves[moveNum + 1], { sloppy: true })
        console.log(otherMove?.san)
        setFen(chess.fen())
        setMoveNum(moveNum + 2)
      }
    }
  }

  return (
    <div className="flex-center">
      <h1>Random Chess Game</h1>
      <Chessboard
        width={400}
        position={fen}
        orientation={sequence.color === "w" ? 'white' : 'black'}
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
    </div>
  );
};
export default App;