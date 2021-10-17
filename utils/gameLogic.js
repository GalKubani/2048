import Tile from '../models/tile'


const addRandomTile = (board) => {
    let updatedBoard = board
    let randomRowNumber = Math.floor(Math.random() * 4)
    let randomColNumber = Math.floor(Math.random() * 4)
    while (updatedBoard.grid[randomRowNumber][randomColNumber].value !== 0) {
        randomRowNumber = Math.floor(Math.random() * 4)
        randomColNumber = Math.floor(Math.random() * 4)
    }
    updatedBoard.grid[randomRowNumber][randomColNumber] = new Tile((Math.floor(Math.random() * 2) + 1) * 2)
    return updatedBoard
}
const moveTileVertically = (updatedBoard, tileRow, tileCol, direction) => {
    while (updatedBoard.grid[tileRow - direction][tileCol].value === 0) {
        updatedBoard.grid[tileRow - direction][tileCol].value = updatedBoard.grid[tileRow][tileCol].value
        updatedBoard.grid[tileRow][tileCol].value = 0
        if (direction === 1 ? (tileRow <= 1) : (tileRow >= 2)) { break; }
        tileRow -= direction
    }
    if (direction === 1 ? (tileRow === 0) : (tileRow === 3)) { return updatedBoard }
    if (updatedBoard.grid[tileRow][tileCol].value === updatedBoard.grid[tileRow - direction][tileCol].value) {
        updatedBoard = mergeTilesVertically(tileRow, tileCol, tileRow - direction, updatedBoard)
    }
    return updatedBoard
}
const moveTileHorizontally = (updatedBoard, tileRow, tileCol, direction) => {
    while (updatedBoard.grid[tileRow][tileCol - direction].value === 0) {
        updatedBoard.grid[tileRow][tileCol - direction].value = updatedBoard.grid[tileRow][tileCol].value
        updatedBoard.grid[tileRow][tileCol].value = 0
        if (direction === 1 ? (tileCol <= 1) : (tileCol >= 2)) { break; }
        tileCol -= direction
    }
    if (direction === 1 ? (tileCol === 0) : (tileCol === 3)) { return updatedBoard }
    if (updatedBoard.grid[tileRow][tileCol].value === updatedBoard.grid[tileRow][tileCol - direction].value) {
        updatedBoard = mergeTilesHorizontally(tileRow, tileCol, tileCol - direction, updatedBoard)
    }
    return updatedBoard
}
const moveTiles = (board, direction, isHorizontal) => {
    let updatedBoard = board
    for (let i = 0; i < 4; i++) {
        for (let j = (direction === -1 ? 2 : 1); direction === -1 ? j >= 0 : j <= 3; j = j + direction) {
            if (isHorizontal && updatedBoard.grid[i][j].value !== 0) { updatedBoard = moveTileHorizontally(updatedBoard, i, j, direction) }
            if (!isHorizontal && updatedBoard.grid[j][i].value !== 0) { updatedBoard = moveTileVertically(updatedBoard, j, i, direction) }
        }
    }
    return updatedBoard
}
const mergeTilesHorizontally = (row, col, mergedCol, updatedBoard) => {
    updatedBoard.grid[row][mergedCol].value = updatedBoard.grid[row][col].value * 2
    updatedBoard.pointsEarnedInMove += (updatedBoard.grid[row][col].value * 2)
    updatedBoard.grid[row][col].value = 0
    return updatedBoard
}
const mergeTilesVertically = (row, col, mergedRow, updatedBoard) => {
    updatedBoard.grid[mergedRow][col].value = updatedBoard.grid[row][col].value * 2
    updatedBoard.pointsEarnedInMove += (updatedBoard.grid[row][col].value * 2)
    updatedBoard.grid[row][col].value = 0
    return updatedBoard
}
const didPlayerLose = (currentBoard) => {
    let rowCheck = currentBoard.grid.filter((row) => {
        if (row[0].value !== row[1].value && row[1].value !== row[2].value &&
            row[2].value !== row[3].value) {
            return false
        }
        return true
    })
    if (rowCheck.length > 0) { return true }
    let columnCheck = false
    for (let i = 0; i < 4; i++) {
        if (currentBoard.grid[0][i] === currentBoard.grid[1][i] || currentBoard.grid[1][i] === currentBoard.grid[2][i] ||
            currentBoard.grid[2][i] === currentBoard.grid[3][i]) {
            columnCheck = true
            break;
        }
    }
    return columnCheck
}

module.exports = { addRandomTile, moveTiles, didPlayerLose }