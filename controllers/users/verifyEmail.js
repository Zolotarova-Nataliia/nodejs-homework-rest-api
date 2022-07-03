const { User } = require("../../models/user");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    if (!verificationToken) {
      throw NotFound();
    }
    const user = await User.findOne({ verificationToken });
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
