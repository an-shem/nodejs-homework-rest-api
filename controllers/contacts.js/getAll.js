<<<<<<< HEAD
const { Contact } = require('../../models');
=======
const contactsOperation = require('../../model');
>>>>>>> parent of 47d46f6 (Подключил в проект mongoose для работы с базой данных  и удалил вся связанное с работой с файлами.)

const getAll = async (_, res) => {
  const contacts = await Contact.find({});
  if (!contacts) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  res.json(contacts);
};

module.exports = getAll;
