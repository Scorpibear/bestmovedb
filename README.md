# bestmovedb
[![Build Status](https://travis-ci.org/Scorpibear/bestmovedb.svg?branch=master)](https://travis-ci.org/Scorpibear/bestmovedb)
[![Coverage Status](https://codecov.io/gh/Scorpibear/bestmovedb/branch/master/graph/badge.svg)](https://codecov.io/gh/Scorpibear/bestmovedb)
[![npm version](https://badge.fury.io/js/bestmovedb.svg)](https://www.npmjs.com/package/bestmovedb)

Database of chess best moves with FEN as a key

## Install
```
npm install bestmovedb --save
```

## Usage
```javascript
const DB = require('bestmovedb');
const db = new DB();
db.add({fen, bestMove, score, depth});
db.getFen({fen, depth});
const json = db.toJSON();
//...
const db2 = new DB();
db2.load(json); // db2 is in the same state as db now
```

## Specification
[bestmovedb spec](./spec/db.spec.js)