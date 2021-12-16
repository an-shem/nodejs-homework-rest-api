const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
<<<<<<< HEAD
const { joiSchemaAdd, joiSchemaUpdate, favoriteJoiSchema } = require('../../models/contact');
=======
const { contactsSchema } = require('../../schemas');
>>>>>>> parent of 47d46f6 (Подключил в проект mongoose для работы с базой данных  и удалил вся связанное с работой с файлами.)

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

<<<<<<< HEAD
router.post('/', validation(joiSchemaAdd), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put('/:contactId', validation(joiSchemaUpdate), ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateFavorite));
=======
router.post('/', validation(contactsSchema.schemaCreateContact), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put('/:contactId', validation(contactsSchema.schemaUpdateContact), ctrlWrapper(ctrl.updateById));
>>>>>>> parent of 47d46f6 (Подключил в проект mongoose для работы с базой данных  и удалил вся связанное с работой с файлами.)

module.exports = router;
