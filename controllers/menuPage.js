const menuRouter = require('express').Router();
const Menu = require('../models/menu');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('bearer ')) {
    return authorization.replace('bearer ', '')
  }
  return null
}

menuRouter.post('/', async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }
  const user = await User.findById(decodedToken.id);

  const menu = new Menu({
    user: user.id,
    category: body.category,
  });

  const savedMenu = await menu.save();
  user.menu = user.menu.concat(savedMenu._id);
  await user.save();

  response.json(savedMenu);
})

module.exports = menuRouter;