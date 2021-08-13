# bestmovedb
[![Build Status](https://travis-ci.org/Scorpibear/bestmovedb.svg?branch=master)](https://travis-ci.org/Scorpibear/bestmovedb)
[![Coverage Status](https://codecov.io/gh/Scorpibear/bestmovedb/branch/master/graph/badge.svg)](https://codecov.io/gh/Scorpibear/bestmovedb)
[![npm version](https://badge.fury.io/js/bestmovedb.svg)](https://www.npmjs.com/package/bestmovedb)

Database of chess best moves with FEN as a key. Stores FENs in normalized state, removing en passant note if en-passant is not allowed.

## Install
```
npm install bestmovedb --save
```

## Usage
```javascript
const DB = require('bestmovedb');
const db = new DB();
db.add({fen: 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2', bestMove: 'exd5', score: 0.6, depth: 45});
const fenData = db.getFen({fen: 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2', depth: 45});
const json = db.toJSON();
//...
const db2 = new DB();
db2.load(json); // db2 is in the same state as db now
```

## Specification
[bestmovedb spec](./spec/db.spec.js)
