const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const readlistSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  poemid: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Readlist', readlistSchema);