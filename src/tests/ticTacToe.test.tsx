const { TicTacToe } = require('../ticTacToe');
const { describe, expect, it } = require('@jest/globals');

describe('TicTacToe', () => {
    const initializeBoard = (board: string) => new TicTacToe(board);

    describe('checkWinner', () => {
        it('should detect a row win', () => {
            const game = initializeBoard('2222000000000000');
            expect(game.checkWinner()).toBe('2');
        });

        it('should detect a column win', () => {
            const game = initializeBoard('1000100010001000');
            expect(game.checkWinner()).toBe('1');
        });

        it('should detect a diagonal win', () => {
            const game = initializeBoard('1000010000100001');
            expect(game.checkWinner()).toBe('1');
        });

        it('should detect a corner win', () => {
            const game = initializeBoard('1021000000001221');
            expect(game.checkWinner()).toBe('1');
        });

        it('should detect a 2x2 box win', () => {
            const game = initializeBoard('2200220000001110');
            expect(game.checkWinner()).toBe('2');
        });

        it('should return null if no winner', () => {
            const game = initializeBoard('1201201200000000');
            expect(game.checkWinner()).toBeNull();
        });
    });

    describe('anyMovesLeft', () => {
        it('should return false if no moves are left', () => {
            const game = initializeBoard('1212212112121122');
            expect(game.anyMovesLeft()).toBe(false);
        });
        
        it('should return false if there is a winner', () => {
            const game = initializeBoard('1120110000000000');
            expect(game.anyMovesLeft()).toBe(false);
        });

        it('should return true if moves are left', () => {
            const game = initializeBoard('1201201200000000');
            expect(game.anyMovesLeft()).toBe(true);
        });
    });

    describe('isGameOver', () => {
        it('should return false if game is not over', () => {
            const game = initializeBoard('1201201200000000');
            expect(game.isGameOver()).toBe(false);
        });

        it('should return true if there is a winner', () => {
            const game = initializeBoard('1111222000000000');
            expect(game.isGameOver()).toBe(true);
        });

        it('should return true if there is no winner and there are no moves left', () => {
            const game = initializeBoard('1212212112121122');
            expect(game.isGameOver()).toBe(true);
        });
    });
});