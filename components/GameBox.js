import React, { useState, useContext, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import BoxItem from './BoxItem';
import { BoardContext } from '../context/boardContext'
import { updateBoard } from '../actions/boardActions';
import GestureRecognizer from 'react-native-swipe-gestures'
import { addRandomTile, moveTiles, didPlayerLose } from '../utils/gameLogic'

const GameBox = ({ updateCurrentScore }) => {
    const { board, boardDispatch } = useContext(BoardContext)
    const [tileCounter, setTileCounter] = useState(1)
    // const [highestTileValue, setHighestTileValue] = useState(2)
    // will nn to manage scan for current highest tile.
    // will also manage tile counter while scanning highest tile
    let currentTileCount = tileCounter

    const makeMove = (direction) => {
        let updatedBoard
        switch (direction) {
            case "right": updatedBoard = moveTiles(board, -1, true); break;
            case "left": updatedBoard = moveTiles(board, 1, true); break;
            case "up": updatedBoard = moveTiles(board, 1, false); break;
            case "down": updatedBoard = moveTiles(board, -1, false); break;
        }
        // will add a check here if a move was made or not, if not breaks function
        // currentTileCount++
        // will scan board after confirming a move was made, to check current highest tile and count tiles
        if (currentTileCount === 16) {
            let isGameOver = didPlayerLose(updatedBoard)
            if (isGameOver) {
                Alert.alert("Game over, cannot make any move")
            }
        }
        updateCurrentScore(updatedBoard.pointsEarnedInMove)
        updatedBoard.pointsEarnedInMove = 0
        updatedBoard = addRandomTile(updatedBoard)
        // setTileCounter(currentTileCount)
        boardDispatch(updateBoard(updatedBoard))
    }
    useEffect(() => {
        if (!board.didGameStart) {
            let newBoard = addRandomTile(board)
            newBoard.didGameStart = true
            boardDispatch(updateBoard(newBoard))
        }
    }, [board.didGameStart])
    useEffect(() => {
        if (tileCounter === 16) {
            let isGameOver = didPlayerLose(board)
            if (isGameOver) {
                console.log('game over')
            }
        }
    }, [tileCounter])
    return (
        <GestureRecognizer style={styles.gameBox}
            onSwipeDown={() => { makeMove("down") }}
            onSwipeLeft={() => { makeMove("left") }}
            onSwipeUp={() => { makeMove("up") }}
            onSwipeRight={() => { makeMove("right") }}
            config={{ velocityThreshold: 0 }}>
            {board.didGameStart && board.grid.map((tileRow) => {
                return (tileRow.map((tile) =>
                    <BoxItem key={Math.random()} tile={tile} />)
                )
            })}
        </GestureRecognizer>
    );
}
const styles = StyleSheet.create({
    gameBox: {
        borderRadius: 5,
        flexDirection: 'row-reverse',
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: '#ccc',
        padding: 10
    },
});

export default GameBox