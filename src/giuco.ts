import { ChessInstance, ShortMove, Square } from "chess.js";

type sequence = {
    name: string,
    fens: string[],
    moves: ShortMove[],
    color: string,
}

type move = {
    from: Square,
    to: Square
}


export let sequence = {
    name: "giuoco piano",
    moves: [
        "e4",
        "e5",
        "Nf3",
        "Nc6",
    ],
    color: "b",
}