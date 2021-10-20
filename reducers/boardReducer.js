import Tile from "../models/tile";

const boardReducer = (board, action) => {
    switch (action.type) {
        case "UPDATE_BOARD":
            return { ...action.board };
        case "RESET_BOARD":
            return {
                grid: [
                    [new Tile(0, false), new Tile(0, false), new Tile(0, false), new Tile(0, false)],
                    [new Tile(0, false), new Tile(0, false), new Tile(0, false), new Tile(0, false)],
                    [new Tile(0, false), new Tile(0, false), new Tile(0, false), new Tile(0, false)],
                    [new Tile(0, false), new Tile(0, false), new Tile(0, false), new Tile(0, false)]
                ], didGameStart: false, pointsEarnedInMove: 0
                // grid: [new Tile(0), new Tile(0), new Tile(0), new Tile(0), new Tile(0), new Tile(0), new Tile(0), new Tile(0),
                // new Tile(0), new Tile(0), new Tile(0), new Tile(0), new Tile(0), new Tile(0), new Tile(0), new Tile(0)]
            }
        default:
            return { ...board }
    }
}
export default boardReducer