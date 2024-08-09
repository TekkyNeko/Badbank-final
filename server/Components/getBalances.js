const User = require("../Components/UserModel");
const jwt = require("jsonwebtoken");
module.exports.GetBalance = async (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
    return res.json({ accounts: null});
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if(err) {
      return res.json({ accounts: null});
    } else {
      const user = await User.findById(data.id);
      if(user) return res.json({status: true, user: user.username, accounts: user.accounts})
    }
  })
}