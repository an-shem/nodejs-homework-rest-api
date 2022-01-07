const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controllers');
const { auth, validation, ctrlWrapper } = require('../../middlewares');
const { joiSchemaAdd, joiSchemaUpdate, favoriteJoiSchema } = require('../../models/contact');

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', auth, ctrlWrapper(ctrl.getById));

router.post('/', auth, validation(joiSchemaAdd), ctrlWrapper(ctrl.add));

router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeById));

router.put('/:contactId', auth, validation(joiSchemaUpdate), ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', auth, validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router;
