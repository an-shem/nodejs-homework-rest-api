const express = require('express');
const router = express.Router();

const { users: ctrl } = require('../../controllers');
const { auth, validation, ctrlWrapper } = require('../../middlewares');
const { joiSchemaUser, subscriptionJoiSchema } = require('../../models/user');

router.post('/signup', validation(joiSchemaUser), ctrlWrapper(ctrl.register));
router.post('/login', validation(joiSchemaUser), ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));
router.get('/current', auth, ctrlWrapper(ctrl.current));
router.patch('/', auth, validation(subscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription));

module.exports = router;
