const express = 'express'

const Users = require('./userDb.js')

const router = express.Router()

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

function validateUserId(req, res, next) {

}

function validateUser(req, res, next) {

}

function validatePost(req, res, next) {

}

module.exports = router
