const User = require("../Components/UserModel");
const jwt = require("jsonwebtoken");
module.exports.Withdraw = async (req, res, next) => {
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
        let withdraw = req.body.withdrawAmount;
        let accountType = req.body.accountType;

        if (accountType === "checking") {
          if (user.accounts.checking.balance < withdraw)
            return res.json({ status: "Error: Insufficient Funds" });
          let newBalance = Number(user.accounts.checking.balance) - Number(withdraw);
          user.accounts.checking.balance = newBalance;
        } else {
          if(user.accounts.savings.balance < withdraw)
          {
            return res.json({status: "Error: Insufficient Funds"});
          }
          let newBalance = Number(user.accounts.savings.balance) - Number(withdraw);
          let newCheckBalance = Number(user.accounts.checking.balance) + Number(withdraw);
          user.accounts.savings.balance = newBalance;
          user.accounts.checking.balance = newCheckBalance;
        }
        user.markModified("accounts");
        await user.save();
        console.log(user.accounts.checking.balance);
        return res.json({ status: "Withdraw Successful!" });
      }
    }
  });
};
