const Bookmark = require('../models/bookmark')
const Comment = require('../models/comment');
const router = require('express').Router();


//  CREATE
router.post('/', async(req, res) => {
  try{
    const createdBookmark = await Bookmark.create(req.body)
    res.status(200).json(createdBookmark)
  }catch(error){
    console.error(error)
    res.status(400).json({ message: error.message })
  }
})

//  READ
//  index
  router.get('/', async(req, res) => {
    try{
      const foundBookmarks = await Bookmark.find({})
      res.status(200).json(foundBookmarks)
    }catch(error){
      console.error(error);
      res.status(400).json({message: error.message})
    }
  })

  // show
  router.get('/:id', async(req, res) => {
    try{
      const foundBookmark = await Bookmark.findById(req.params.id)
      res.status(200).json(foundBookmark)
    }catch(error){
      console.error(error);
      res.status(400).json({message: error.message})
    }
  })

//  UPDATE
//  update bookmark
  router.put('/:id', async(req, res) => {
    try{
      const updatedBookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true})
      res.status(200).json(updatedBookmark)
    }catch(error){
      console.error(error);
      res.status(400).json({ message: error.message })
    }
  })


// add comment
//  create a comment and add it to the comment array of the bookmark in question, and send back a relevant reponse

  router.put('/:id/addComment', (req, res) => {
    const createCommentQuery = Comment.create(req.body)
    createCommentQuery.exec((err, createdComment) => {
      if(err){
        console.error(err);
        res.status(400).json({ message: err.message})
      }else{
        const updateBookmarkQuery = Bookmark.findByIdAndUpdate(req.params.id,
        {$addToSet: {comments: createdComment._id}}, { new: true })
        updateBookmarkQuery.exec((err, updatedBookmark) => {
          if(err){
            console.error(err);
            res.status(400).json({ message: err.message })
          }else{
            res.status(200).json(createdComment)
          }
        })
      }
    })
  })


//  DELETE

  router.delete('/:id', async(req, res) => {
    try{
      const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);
      res.status(200).json(deletdBookmark)
    }catch(error){
      console.error(error);
      res.status(400).json({ message: error.message})
    }
  })

  module.exports = router;
