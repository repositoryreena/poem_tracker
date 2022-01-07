require('./config/database')
const Poem = require('./models/poem');
const Read = require('./models/read')

let m;
let p;

Poem.findOne({}, function(err, poem) {
  m = poem;
});

Read.findOne({}, function(err, read) {
  m = read;
});