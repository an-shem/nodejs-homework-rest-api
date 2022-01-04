const { Contact } = require('../../models');

const getAll = async (req, res) => {
  const { _id } = req.user;
  const contacts = await Contact.find({ owner: _id }).populate('owner', '_id email subscription');
  if (!contacts || contacts.length === 0) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  res.json(contacts);
};

module.exports = getAll;
