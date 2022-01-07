const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const removeById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const removedСontact = await Contact.findOneAndRemove({ _id: contactId, owner: { _id: _id } });
  if (!removedСontact) {
    throw new NotFound();
  }
  res.json({ message: 'contact deleted' });
};

module.exports = removeById;
