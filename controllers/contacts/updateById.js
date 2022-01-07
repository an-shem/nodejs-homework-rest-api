const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const updateById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const updateContact = await Contact.findOneAndUpdate({ _id: contactId, owner: { _id: _id } }, req.body, {
    new: true,
  });
  console.log('updateContact', updateContact);
  if (!updateContact) {
    throw new NotFound();
  }
  res.json(updateContact);
};

module.exports = updateById;
