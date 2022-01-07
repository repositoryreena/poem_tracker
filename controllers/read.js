const Read = require('../models/read');
const Poem = require('../models/poem');

module.exports = {
  index,
  mark,
  delete: deleteReadPoem
};

function mark(req, res) {
  let id = req.params.id, uid = req.user._id;
  console.log(id+ ' 1 ' +uid)
  const read = new Read({userid: uid, poemid: id});
  read.save(function(err) {
    console.log('2 '+err)
    if (err) return res.status(500).send(new Error(err));
    res.send('it worked');
  });
}

function index(req, res) {
  Read.find({userid: req.user._id}, function(err, reads) {
    console.log('reads: ' + JSON.stringify(reads));
    let ids = reads.map(p => p.poemid);
    Poem.find({ $in: ids }, function(err, poems) {
      res.render('poems/read', { title: 'Poems I\'ve Read', poems });
    });
  });
}

//delete
function deleteReadPoem(req, res) {  //defining a function called delete poem
  console.log("trying delete")
  Read.findOneAndDelete( //Poem is a model that is providing you a function.  Remove a single document from a collection based on a query and return a document with the same form as the document immediately before it was deleted. Unlike collection.deleteOne(), this action allows you to atomically find and delete a document with the same command. This avoids the risk of other update operations changing the document between separate find and delete operations.
    // Ensue that the book was created by the logged in user
    {_id: req.params.id}, function(err) { //you pass in a property
      if (err) {
        console.error(err)
        return res.send({error: err})
      }
      // Deleted book, so must redirect to index
      // res.redirect('/poems');
      res.send('deleted')
    }
  );
}
