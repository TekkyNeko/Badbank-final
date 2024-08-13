const User = require("../Components/UserModel");
const { createSecretToken } = require("../Components/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await User.create({ email, password: hashedPassword, username, createdAt });
    const token = createSecretToken(user._id);
    
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    console.log(password)
    if(!email || !password) {
      return res.json ({message:'All fields are required'});
    }
    const user = await User.findOne({ email });
    if(!user) {
      console.log(`Failed to find User ${email}`)
      return res.json({message: "Incorrect email or password"});
    }
    const auth = await bcrypt.compare(password,user.password)
    if(!auth) {
      console.log(`Password failed! ${password} ${user.password}`)
      return res.json({message: 'Incorrect email or password'});
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ message: "User logged in successfully", success: true });
    next()
  } catch (error) {
    console.error(error);
  }
}