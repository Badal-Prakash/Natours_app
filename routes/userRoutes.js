const express = require('express');
const router = express.Router();
const userconroller = require('./../controller/userController');
router
  .route('/')
  .get(userconroller.getallusers)
  .post(userconroller.createuser);
router
  .route('/:id')
  .get(userconroller.getUser)
  .patch(userconroller.patchUser)
  .delete(userconroller.deleteUser);
module.exports = router;
