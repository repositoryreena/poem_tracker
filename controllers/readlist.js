const Readlist = require('../models/readlist');

module.exports = {
  index,
  add,
  delete: deleteReadlistPoem
};

function add(req, res) {
  let id = req.params.id, uid = req.user._id;
  const readlist = new Readlist({userid: uid, poemid: id});
  readlist.save(function(err) {
    if (err) return res.status(500);
    res.send('it worked');
  });
}

function index(req, res) {
  Readlist.find({userid: req.user._id}, function(err, readlist) {
    res.render('poems/readlist', { title: 'Read List', readlist });
  });
}

//delete
function deleteReadlistPoem(req, res) {  //defining a function called delete poem
  console.log("trying delete")
  Readlist.findOneAndDelete( //Poem is a model that is providing you a function.  Remove a single document from a collection based on a query and return a document with the same form as the document immediately before it was deleted. Unlike collection.deleteOne(), this action allows you to atomically find and delete a document with the same command. This avoids the risk of other update operations changing the document between separate find and delete operations.
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
