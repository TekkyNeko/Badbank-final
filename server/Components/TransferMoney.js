const User = require("../Components/UserModel");
const jwt = require("jsonwebtoken");
module.exports.Transfer = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ accounts: null });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ accounts: null });
    } else {
      const user = await User.findById(data.id);
      const user2 = await User.findOne({ username: req.body.username }).exec();
      if (user) {
        if (user2 !== null && user.username !== user2.username) {
          let transfer = req.body.transferAmount;
          if (user.accounts.checking.balance < transfer)
            return res.json({ err: "Error: Insufficient Funds" });
          let newBalance =
            Number(user.accounts.checking.balance) - Number(transfer);
          user.accounts.checking.balance = newBalance;
          user2.accounts.checking.balance =
            Number(user2.accounts.checking.balance) + Number(transfer);
          user.markModified("accounts");
          user2.markModified("accounts");
          await user.save();
          await user2.save();
        } else {
          return res.json({ err: "User does not exist" });
        }

        console.log(user.accounts.checking.balance);
        return res.json({ status: true });
      }
    }
  });
};
