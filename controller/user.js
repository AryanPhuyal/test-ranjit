const { changePassword } = require("./helper/auth");
const { userDetails } = require("./helper/user");
const resetPassword = (req, res) => {};
const User = require("../model/User");

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    let user = await User.findById(userId);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.aboutMe = req.body.aboutMe;
    user.phoneNo = req.body.phoneNo;
    user.gender = req.body.gender;
    user.workAt = req.body.workAt;
    await user.save();

    res.redirect("/api/auth/me");
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
};

exports.changePassword = (req, res) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const email = req.body.email;
  if (email === req.user.email)
    changePassword(email, oldPassword, newPassword, (err, user) => {
      if (!err) {
        res.json({ success: "success" });
      } else if (err === "PasswordNotMatch") {
        res.status(400).json({ err: "Password Not Match" });
      } else if (err == "notExists")
        res.status(400).json({ err: "Email not exists" });
      else res.status(500).json({ err: "Server Error" });
    });
  else res.status(400).json({ err: "Email address is not valid" });
};

exports.me = (req, res) => {
  const userId = req.user._id;
  userDetails(userId, (err, user) => {
    if (!err) res.json(user);
    else res.status(500).json({ err: "Internal server Error" });
  });
};

const verifyAccount = (req, res) => {};
