const { User } = require('../../models');

const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;
  const updateUser = await User.findByIdAndUpdate(id, { subscription }, { new: true });
  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        _id: updateUser.id,
        email: updateUser.email,
        subscription: updateUser.subscription,
      },
    },
  });
};

module.exports = updateSubscription;
