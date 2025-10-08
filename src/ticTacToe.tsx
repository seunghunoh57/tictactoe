/**
 * this class performs a game of 4x4 tic-tac-toe.
 * 
 * winning conditions are as follows:
 * 1. 4 in a row (vertical, horizontal, or diagonal)
 * 2. all 4 corners
 * 3. 2x2 box
 * 
 * the class should be able to check for winner, check if there are any moves left, and check if the game is over.
 * 
 * there's only 20 ways to win:
 * 2 diagonals + 4 verticals + 4 horizontal + (3 rows * 3 2x2 boxes) + 1 all corners = 20
 * 
 * since there are only 20 ways to win, it's best to just check if a player's board state matches one of the 20 winning states. 
 * if we represent the board as a string, we can store all winning combinations for a person as an array of numbers represented by
 * interpreting the player's cells as bits.
 * 
 * board is represented as a string from top left to bottom right, top down. i.e., [[0,1,1,0], [2,1,0,0], [2,2,0,0], [0,0,1,0]] => 0110210022000010
 * 
 * in that example, player 1's number would be 2**14 + 2**13 + 2**10 + 2**1 = 25602
 */

const BASE_SIZE = 4
const BASE_BOARD = '0'.repeat(BASE_SIZE ** 2)

/**
 * horizontals:
 * 15, 240, 3480, 61440
 * 
 * verticals:
 * 4369, 8738, 17476, 34952
 * 
 * diagonals:
 * 4680, 33825
 * 
 * corners:
 * 36873
 * 
 * 2x2 boxes:
 * 51, 102, 204, 816, 1632, 3264, 13056, 26112, 52224
 */
const WINNING_STATES = [15, 51, 102, 204, 240, 816, 1632, 3264, 3840, 4369, 4680, 8738, 13056, 17476, 26112, 33825, 34952, 36873, 52224, 61440]

type Player = '1' | '2'

class TicTacToe {
    length: number = BASE_SIZE ** 2
    board: string
    winner: Player | false = false

    constructor(board?: string) {
        this.board = board && board.length === this.length ? board : BASE_BOARD
    }

    /**
     * determines the winner given the current board state. returns winner if there is one for the board state, otherwise return null
     */
    public checkWinner(): Player | null {
        if (this.winner){
            return this.winner
        }

        // iterate through board
        // calculate bit sums for Player 1 and Player 2
        let playerOneBitSum = 0
        let playerTwoBitSum = 0

        for (let i = 0; i < this.length; i++) {
            const cell = this.board[i]
            if (cell === '1') {
                playerOneBitSum += 2 ** (this.length - 1 - i)
            } else if (cell === '2') {
                playerTwoBitSum += 2 ** (this.length - 1 - i)
            }
        }

        // if either of them contain winning combinations, return the winning player
        // if there is a winner, memoize in the class that there is a winner for faster calculation in isGameOver()
        if (WINNING_STATES.includes(playerOneBitSum)) {
            this.winner = '1'
            return '1'
        }

        if (WINNING_STATES.includes(playerTwoBitSum)) {
            this.winner = '2'
            return '2'
        }

        // return null otherwise
        return null
    }

    /**
     * determines if given player has any moves left. returns boolean true if there is a valid move, otherwise returns false
     */
    public anyMovesLeft(): boolean {
        // check if there is a winner. if yes, return []
        if (this.checkWinner() !== null) {
            return false
        }

        // if there is no winner yet, return true if board contains an empty cell, aka 0 Cell value
        return this.board.includes('0')
    }

    /**
     * determines if the game is over. this is determined by the winning conditions from above, or from lack of moves.
     * returns true if game is over, false otherwise
     */
    public isGameOver(): boolean {
        // check if there is a winner first for early exit
        if (this.checkWinner() !== null) {
            return true
        }

        // check if there are any moves left for both players. return true if there is one
        return !this.anyMovesLeft()
    }
}

module.exports = { TicTacToe }