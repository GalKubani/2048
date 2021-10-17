import React, { createContext, useReducer } from 'react';
import Tile from '../models/tile';
import boardReducer from '../reducers/boardReducer';
export const BoardContext = createContext();

const BoardContextProvider = (props) => {

    const [board, boardDispatch] = useReducer(boardReducer, {
        grid: [
            [new Tile(0), new Tile(0), new Tile(0), new Tile(0)],
            [new Tile(0), new Tile(0), new Tile(0), new Tile(0)],
            [new Tile(0), new Tile(0), new Tile(0), new Tile(0)],
            [new Tile(0), new Tile(0), new Tile(0), new Tile(0)]
        ], didGameStart: false, pointsEarnedInMove: 0
    });
    return (
        <BoardContext.Provider value={{ board, boardDispatch }}>
            {props.children}
        </BoardContext.Provider>
    );
};

export default BoardContextProvider;