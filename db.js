const fenAnalyzer = require('fen-analyzer');

class DB {
  constructor() {
    this.fenMap = new Map();
  }
  add({fen, bestMove, score, depth}) {
    fen = fenAnalyzer.normalize(fen);
    const prevData = this.fenMap.get(fen);
    if(prevData && (depth <= prevData.depth)) {
      return;
    }
    this.fenMap.set(fen, {bestMove, score, depth});
  }
  get size() {
    return this.fenMap.size;
  }
  getFen({fen, depth}) {
    fen = fenAnalyzer.normalize(fen);
    const data = this.fenMap.get(fen);
    if(data && (!depth || depth <= data.depth)) {
      return {fen, bestMove: data.bestMove, score: data.score, depth: data.depth};
    } else {
      return null;
    }
  }
  toJSON() {
    return [...this.fenMap];
  }
  load(json) {
    this.fenMap = new Map(json);
  }
}

module.exports = DB;
