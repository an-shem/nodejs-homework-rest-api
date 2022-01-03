const express = require('express');
const router = express.Router();

const { users: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
const { joiSchemaUser } = require('../../models/user');

router.post('/signup', validation(joiSchemaUser), ctrlWrapper(ctrl.register));

module.exports = router;
