const DB = require('../db');

describe('db', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const fen2 = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
  const bestMove = 'e4';
  const score = 0.1;
  const depth = 90;

  it('what is added could be get', () => {
    const db = new DB();
    db.add({fen, bestMove, score, depth});
    expect(db.getFen(fen)).toEqual({fen, bestMove, score, depth});
  });
  
  it('json could be loaded recovering the state', () => {
    const db = new DB();
    db.add({fen, bestMove, score, depth});
    db.add({fen: fen2, bestMove: 'd4', score: 0.2, depth: 100});
    const json = db.toJSON();
    const db2 = new DB();
    db2.load(json);
    expect(db2.getFen(fen)).toEqual({fen, bestMove, score, depth});
    expect(db2.getFen(fen2)).toEqual({fen: fen2, bestMove: 'd4', score: 0.2, depth: 100});
  });

  describe('add', () => {
    it('updates existent', () => {
      const db = new DB();
      db.add({fen, bestMove, score, depth});
      db.add({fen, bestMove: 'd4', score: 0.01, depth: 100});
      expect(db.getFen(fen)).toEqual({fen, bestMove: 'd4', depth: 100, score: 0.01});
    });
    it('keep previous fen data if new added has the same depth', () => {
      const db = new DB();
      db.add({fen, bestMove, score, depth});
      db.add({fen, bestMove: 'd4', score: 0.01, depth: 90});
      expect(db.getFen(fen)).toEqual({fen, bestMove, depth, score});
    });
  });
});
