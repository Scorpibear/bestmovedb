const DB = require('../db');

describe('db', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const fen2 = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
  const bestMove = 'e4';
  const score = 0.1;
  const depth = 90;
  let db;

  beforeEach(() => {
    db = new DB();
  });

  it('returns what is added', () => {
    db.add({fen, bestMove, score, depth});
    expect(db.getFen({fen})).toEqual({fen, bestMove, score, depth});
  });
  
  it('loads the state from json', () => {
    db.add({fen, bestMove, score, depth});
    db.add({fen: fen2, bestMove: 'd4', score: 0.2, depth: 100});
    const json = db.toJSON();
    const db2 = new DB();
    db2.load(json);
    expect(db2.getFen({fen})).toEqual({fen, bestMove, score, depth});
    expect(db2.getFen({fen: fen2})).toEqual({fen: fen2, bestMove: 'd4', score: 0.2, depth: 100});
  });

  describe('add', () => {
    it('updates existent', () => {
      db.add({fen, bestMove, score, depth});
      db.add({fen, bestMove: 'd4', score: 0.01, depth: 100});
      expect(db.getFen({fen})).toEqual({fen, bestMove: 'd4', depth: 100, score: 0.01});
    });
    it('keep previous fen data if new added has the same depth', () => {
      db.add({fen, bestMove, score, depth});
      db.add({fen, bestMove: 'd4', score: 0.01, depth: 90});
      expect(db.getFen({fen})).toEqual({fen, bestMove, depth, score});
    });
    it('consider FENs equal if the only difference is unrealistic en passant', () => {
      const fen = 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4';
      const fen2 = 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq d6 0 4';
      db.add({fen, bestMove, score, depth});
      expect(db.getFen({fen2})).toEqual({fen, bestMove, depth, score});
    });
  });
  describe('getFen', () => {
    it('returns null if requested depth is higher than in db', () => {
      db.add({fen, depth: 90, bestMove, score});
      expect(db.getFen({fen, depth: 100})).toBeNull();
    });
    it('returns fen if requested depth matches', () => {
      db.add({fen, depth, bestMove, score});
      expect(db.getFen({fen, depth})).toEqual({fen, depth, bestMove, score});
    });
    it('returns fen if requests depth less than in db', () => {
      db.add({fen, depth, bestMove, score});
      expect(db.getFen({fen, depth: depth-2})).toEqual({fen, depth, bestMove, score});
    });
  });
  describe('size', () => {
    it('should be zero at start', () => {
      expect(db.size).toBe(0);
    });
  });
});
