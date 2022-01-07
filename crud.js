require('./config/database')
const Poem = require('./models/poem');
const Readlist = require('./models/readlist')
const Read = require('./models/read')

let m;
let p;

Poem.findOne({}, function(err, poem) {
  m = poem;
});

Readlist.findOne({}, function(err, readlist) {
  m = readlist;
});

Read.findOne({}, function(err, read) {
  m = read;
});