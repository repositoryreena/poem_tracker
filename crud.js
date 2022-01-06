require('./config/database')
const Poem = require('./models/poem');

let m;
let p;

Poem.findOne({}, function(err, poem) {
  m = poem;
});