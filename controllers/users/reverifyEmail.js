const { BadRequest } = require('http-errors');
const { User } = require('../../models');
const { v4 } = require('uuid');
const { sendEmail } = require('../../helpers');

const reverifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }

  const verificationToken = v4();

  await User.findByIdAndUpdate(user._id, { verificationToken });

  const mail = {
    to: email,
    subject: 'Подтверждение email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: 'Verification email sent',
  });
};

module.exports = reverifyEmail;
