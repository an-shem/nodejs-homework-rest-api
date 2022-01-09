const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const updateFavorite = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updateContact = await Contact.findOneAndUpdate({ _id: contactId, owner: _id }, { favorite }, { new: true });
  if (!updateContact) {
    throw new NotFound();
  }
  res.json(updateContact);
};

module.exports = updateFavorite;
