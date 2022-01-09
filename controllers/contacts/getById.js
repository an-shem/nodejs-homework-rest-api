const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const getById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const contact = await Contact.findOne({ _id: contactId, owner: _id }).populate('owner', '_id email subscription');
  if (!contact) {
    throw new NotFound();
  }
  res.json(contact);
};

module.exports = getById;
