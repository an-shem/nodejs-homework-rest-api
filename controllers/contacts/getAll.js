const { BadRequest, NotFound } = require('http-errors');
const { Contact } = require('../../models');

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;

  if (isNaN(page) || isNaN(limit)) {
    throw new BadRequest();
  }

  const skip = (page - 1) * limit;

  const filter = { owner: _id };
  if (favorite) {
    filter.favorite = favorite;
  }

  const contacts = await Contact.find(filter, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id email subscription');

  if (!contacts || contacts.length === 0) {
    throw new NotFound();
  }
  res.json(contacts);
};

module.exports = getAll;
