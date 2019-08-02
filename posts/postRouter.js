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

router.get('/:id', validatePostId, async (req, res) => {
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

router.post('/', validatePost, async (req, res) => {
  try {
    const messageOfTheDay = process.env.MOTD || 'Hello, World!'
    const post = await Posts.insert(req.body)
    res.status(201).json({ motd: messageOfTheDay, post })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not add the post 💩'
    })
  }
})

router.delete('/:id', validatePostId, async (req, res) => {
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
//
router.put('/:id', validatePostId, validatePostContent, async (req, res) => {
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

async function validatePostId(req, res, next) {
  try {
    const { id } = req.params
    const post = await Posts.getById(id)
    if (post) {
      req.post = post
      next()
    } else {
      res.status(404).json({
        message: 'The post you are looking for could not be found 🤷‍'
      })
    }
  } catch (error) {
    // console.log(error)
    console.log(req.params.id)
    res.status(500).json({error})
  }
}

function validatePost(req, res, next) {
  try {
    const post = req.body
    if (post.text) {
      console.log('Post validation success')
      req.post = post
      next()
    } else {
      res.status(400).json({ message: 'Body not found in request 💩' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

function validatePostContent(req, res, next) {
  try {
    const post = req.body
    if (post.text || post.user_id) {
      next()
    } else {
      res.status(400).json({
        message: 'Either a text field, user ID, or both are required 🤦‍'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports = router