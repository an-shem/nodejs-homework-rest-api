const { v4 } = require('uuid');
const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { User } = require('../../models');
const { sendEmail } = require('../../helpers');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }

  const verificationToken = v4();
  const avatarURL = gravatar.url(email, { protocol: 'http', s: '100' });
  const hachPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({ email, password: hachPassword, avatarURL, verificationToken });

  const mail = {
    to: email,
    subject: 'Подтверждение email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email,
      subscription: 'starter',
    },
  });
};

module.exports = register;
