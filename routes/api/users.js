const express = require('express');
const router = express.Router();

const { users: ctrl } = require('../../controllers');
const { auth, upload, validation, ctrlWrapper } = require('../../middlewares');
const { joiSchemaUser, subscriptionJoiSchema, joiSchemaVerify } = require('../../models/user');

router.post('/signup', validation(joiSchemaUser), ctrlWrapper(ctrl.register));
router.post('/login', validation(joiSchemaUser), ctrlWrapper(ctrl.login));
router.post('/verify', validation(joiSchemaVerify), ctrlWrapper(ctrl.reverifyEmail));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));
router.get('/current', auth, ctrlWrapper(ctrl.current));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));
router.patch('/', auth, validation(subscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription));
router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
