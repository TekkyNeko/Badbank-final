const User = require("../Components/UserModel");
const jwt = require("jsonwebtoken");
module.exports.Deposit = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ accounts: null });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ accounts: null });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        let deposit = req.body.depositAmount;
        let accountType = req.body.accountType;

        if (accountType === "checking") {
          let newBalance = Number(user.accounts.checking.balance) + Number(deposit);
          user.accounts.checking.balance = newBalance;
        } else {
          
          let newBalance = Number(user.accounts.savings.balance) + Number(deposit);
          user.accounts.savings.balance = newBalance;
        }
        user.markModified("accounts");
        await user.save();
        console.log(user.accounts.checking.balance);
        return res.json({ status: "Deposit Successful!" });
      }
    }
  });
};
