const { User } = require("../../models/user");
const { BadRequest } = require("http-errors");
const sendEmail = require("../../helpers/sendEmail");

const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw BadRequest(`missing required field email`);
    }
    const user = await User.findOne({ email });
    const verificationToken = user.verificationToken;
    if (user.verify) {
      throw BadRequest(`Verification has already been passed`);
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    const mail = {
      to: email,
      subject: "Подтверждение email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
    };
    await sendEmail(mail);
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmail;
