const Poem = require('../models/poem');

module.exports = {
  create,
  delete: deleteComment
};

function deleteComment(req, res, next) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Poem.findOne({'comments._id': req.params.id}).then(function(poem) {
    // Find the review subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const comment = poem.comments.id(req.params.id);
    // Ensure that the review was created by the logged in user
    if (!comment.user.equals(req.user._id)) return res.redirect(`/poems/${poems._id}`);
    // Remove the review using the remove method of the subdoc
    comment.remove();
    // Save the updated poem
    poem.save().then(function() {
      // Redirect back to the poem's show view
      res.redirect(`/poems/${poem._id}`);
    }).catch(function(err) {
      // Let Express display an error
      return next(err);
    });
  });
}

function create(req, res) {
  // Find the poem to embed the review within
  Poem.findById(req.params.id, function(err, poem) {
    // Add the user-centric info to req.body
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // Push the subdoc for the review
    poem.comments.push(req.body);
    // Always save the top-level document (not subdocs)
    poem.save(function(err) {
      res.redirect(`/poems/${poem._id}`);
    });
  });
}