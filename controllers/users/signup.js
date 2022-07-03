const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const sendEmail = require("../../helpers/sendEmail");
const { User } = require("../../models/user");

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`Email ${email} in use`);
    }
    const avatarURL = gravatar.url(email);
    // Вариант с созданием методов модели для хэширования
    // const newUser = new User({name, email, verificationToken});
    // newUser.setPassword(password);
    // newUser.save();
    const verificationToken = v4();

    const mail = {
      to: email,
      subject: "Подтверждение email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
    };
    await sendEmail(mail);

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({
      name,
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    res.status(201).json({
      user: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
