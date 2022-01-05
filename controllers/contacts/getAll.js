const { Contact } = require('../../models');

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  let contacts = null;
  if (favorite) {
    contacts = await Contact.find({ owner: _id, favorite }, '', {
      skip,
      limit: Number(limit),
    }).populate('owner', '_id email subscription');
  } else {
    contacts = await Contact.find({ owner: _id }, '', {
      skip,
      limit: Number(limit),
    }).populate('owner', '_id email subscription');
  }
  if (!contacts || contacts.length === 0) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  res.json(contacts);
};

module.exports = getAll;
