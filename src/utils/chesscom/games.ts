import axios from 'axios'
import parser from 'pgn-parser'

export const getGames = async () => {
    let archiveRes = await axios.get('https://api.chess.com/pub/player/ryanbrew13/games/archives')
    for (let i = 0; i < 1; i++) {
        let gamesRes = await axios.get(archiveRes.data.archives[i])
        let { games } = gamesRes.data
        games.filter((e: any) => e.time_class === 'rapid' && e.rules === 'chess')
        games.map((game: any) => {
            let res = parser.parse(game.pgn)
            console.log(res)
        })
    }
}