const express = require('express')

const Posts = require('./postDb.js')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const posts= await Posts.get(req.query)
    res.status(200).json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not retrieve the posts 💩'
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.getById(req.params.id)
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({
        message: 'The post you are looking for could not be found 🤷‍'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not retrieve the post 💩'
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const post = await Posts.insert(req.body)
    res.status(201).json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not add the post 💩'
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id)
    if (count > 0) {
      res.status(200).json({
        message: 'This post has been deleted ☠️'
      })
    } else {
      rex.status(404).json({
        message: 'The post you are looking for could not be found 🤷‍'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not delete the post 💩'
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const post = await Posts.update(req.params.id, req.body)
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({
        message: 'The post you are trying to update could not be found 🤷'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not update the post 💩'
    })
  }
})

// custom middleware 🔥

function validatePostId(req, res, next) {

}

module.exports = router