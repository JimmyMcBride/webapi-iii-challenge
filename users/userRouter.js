const express = require('express')

const Users = require('./userDb.js')

const router = express.Router()

router.get('/', validateUsers, async (req, res) => {
  try {
    const users= await Users.get(req.query)
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not retrieve the users 💩'
    })
  }
})

router.get('/:id', validateUserId, async (req, res) => {
  try {
    const user = await Users.getById(req.params.id)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({
        message: 'The user you are looking for could not be found 🤷‍'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not retrieve the user 💩'
    })
  }
})

router.post('/', validateUsers, async (req, res) => {
  try {
    const user = await Users.insert(req.body)
    res.status(201).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not add the user 💩'
    })
  }
})

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    const count = await Users.remove(req.params.id)
    if (count > 0) {
      res.status(200).json({
        message: 'This user has been deleted ☠️'
      })
    } else {
      rex.status(404).json({
        message: 'The user you are looking for could not be found 🤷‍'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not delete the user 💩'
    })
  }
})

router.put('/:id', validateUserId, async (req, res) => {
  try {
    const user = await Users.update(req.params.id, req.body)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({
        message: 'The user you are trying to update could not be found 🤷'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not update the user 💩'
    })
  }
})

//custom middleware

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params
    const user = await Users.getById(id)
    if (user) {
      console.log('User ID validation success')
      console.log(req.params)
      req.user = user
      next()
    } else {
      res.status(404).json({ message: 'The user you are looking for could not be found 🤷‍' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// this code is broke

function validateUsers(req, res, next) {
  try {
    const user = req.body
    if (user) {
      console.log('User validation success')
      next()
    } else {
      res.status(400).json({
        message: 'Name not found in request 💩'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// This middleware function is garbage 💩

// function validatePost(req, res, next) {
//   try {
//     const post = req.body
//     if (post.text) {
//       console.log('Post validation success')
//       req.post = post
//       next()
//     } else {
//       console.log(req.body)
//       res.status(400).json({ message: 'Body not found in request 💩' })
//     }
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

module.exports = router
