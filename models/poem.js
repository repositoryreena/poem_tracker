const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const poemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  poet: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    default: function () {
      return new Date().getFullYear();
    }
  },
  poem: {
    type: String,
    required: true
  },

  comments: [commentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Poem', poemSchema);