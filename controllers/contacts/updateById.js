const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const updateById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const updateContact = await Contact.findOneAndUpdate({ _id: contactId, owner: _id }, req.body, {
    new: true,
  }).populate('owner', '_id email subscription');

  if (!updateContact) {
    throw new NotFound();
  }
  res.json(updateContact);
};

module.exports = updateById;
