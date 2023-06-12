const menuRouter = require('express').Router();
const Menu = require('../models/menu');
const User = require('../models/user');

menuRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = await User.findById(request.body.userId);

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