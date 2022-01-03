const express = require('express');
const router = express.Router();

const { users: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
const { joiSchemaUser } = require('../../models/user');

router.post('/signup', validation(joiSchemaUser), ctrlWrapper(ctrl.register));
router.post('/login', validation(joiSchemaUser), ctrlWrapper(ctrl.login));

module.exports = router;
