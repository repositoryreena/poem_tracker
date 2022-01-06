const Poem = require('../models/poem');

module.exports = {
  index,
  new: newPoem,
  create,
  show,
  delete: deletePoem,
  update
};

function index(req, res) {
  Poem.find({}, function(err, poems) {
    res.render('poems/index', { title: 'All Poems', poems });
  });
}

function newPoem(req, res) {
  res.render('poems/new', { title: 'Add Poem' });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // ensure empty inputs are removed so that model's default values will work
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const poem = new Poem(req.body);
  poem.save(function(err) {
    if (err) return res.redirect('/poems/new');
    res.redirect(`/poems/${poem._id}`);
  });
}
//show
function show(req, res) {
  Poem.findById(req.params.id, function(err, poem) {
    if (err || !poem) return res.redirect('/poems');
    res.render('poems/show', {poem, title: 'Show Poem'});
  });
}
//delete
function deletePoem(req, res) {  //defining a function called delete poem
  console.log("trying delete")
  Poem.findOneAndDelete( //Poem is a model that is providing you a function.
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


//update
function update(req, res) {
  Poem.findOneAndUpdate(
    {_id: req.params.id, userRecommending: req.user._id},
    // update object with updated properties
    req.body,
    // options object with new: true to make sure updated doc is returned
    {new: true},
    function(err, poem) {
      if (err || !poem) return res.redirect('/poems');
      res.redirect(`poems/${poem._id}`);
    }
  );
}