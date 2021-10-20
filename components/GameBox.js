import React, { useState, useContext, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import BoxItem from './BoxItem';
import { BoardContext } from '../context/boardContext'
import { updateBoard } from '../actions/boardActions';
import GestureRecognizer from 'react-native-swipe-gestures'
import { addRandomTile, moveTiles, didPlayerLose, scanIfBoardChanged, scanCurrentTiles, copyBoard } from '../utils/gameLogic'

const GameBox = ({ updateCurrentScore }) => {
    const { board, boardDispatch } = useContext(BoardContext)
    const [highestTileValue, setHighestTileValue] = useState(0)
    const [tileCounter, setTileCounter] = useState(0)

    const makeMove = (direction) => {
        let copiedBoard = copyBoard(board)
        let updatedBoard
        switch (direction) {
            case "right": updatedBoard = moveTiles(board, -1, true); break;
            case "left": updatedBoard = moveTiles(board, 1, true); break;
            case "up": updatedBoard = moveTiles(board, 1, false); break;
            case "down": updatedBoard = moveTiles(board, -1, false); break;
        }
        let didMoveHappen = scanIfBoardChanged(copiedBoard.grid, updatedBoard.grid);
        if (!didMoveHappen) { return }
        let scanResults = scanCurrentTiles(updatedBoard)
        let currentTileCount = scanResults[0]
        let currentHighestValueTile = scanResults[1]
        let newestTilePosition = scanResults[2]
        setHighestTileValue(currentHighestValueTile)
        if (currentHighestValueTile === 2048) {
            updateCurrentScore(updatedBoard.pointsEarnedInMove)
            boardDispatch(updateBoard(updatedBoard))
            return
        }
        setTileCounter(currentTileCount)
        updateCurrentScore(updatedBoard.pointsEarnedInMove)
        updatedBoard.pointsEarnedInMove = 0
        updatedBoard.grid[newestTilePosition[0]][newestTilePosition[1]].newTile = false
        updatedBoard = addRandomTile(updatedBoard)
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
        if (highestTileValue === 2048) {
            Alert.alert("Good job, you won!")
            // will end game here so gestures wont work
        }
    }, [highestTileValue])
    useEffect(() => {
        if (tileCounter === 16) {
            let isGameOver = didPlayerLose(board)
            if (isGameOver) {
                Alert.alert("Game over, cannot make any move")
                // will end game here so gestures wont work
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
                return (tileRow.map((tile, colIndex) =>
                    <BoxItem key={colIndex} tile={tile} />)
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