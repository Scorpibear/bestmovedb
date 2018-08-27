class DB {
  constructor() {
    this.fenMap = new Map();
  }
  add({fen, bestMove, score, depth}) {
    const prevData = this.fenMap.get(fen);
    if(prevData && (depth <= prevData.depth)) {
      return;
    }
    this.fenMap.set(fen, {bestMove, score, depth});
  }
  getFen(fen) {
    const data = this.fenMap.get(fen);
    if(data) {
      const {bestMove, score, depth} = data;
      return {fen, bestMove, score, depth};
    } else {
      return data;
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
