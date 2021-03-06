const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.password === '') {
    return response.status(400).json({error: 'missing password'})
  }
  if(body.password.length < 3) {
    return response.status(400).json({error: 'password too short'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  console.log('savedUser :>> ', savedUser);
  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, likes: 1 })
    
  response.json(users.map(u => u.toJSON()))
})


module.exports = usersRouter