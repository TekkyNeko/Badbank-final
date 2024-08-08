const { Signup, Login } = require("../Components/AuthController");
const { userVerification } = require("../Components/AuthMiddleware")
const {GetBalance} = require("../Components/getBalances")
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/', userVerification);
router.post('/getbalance', GetBalance);

module.exports = router;