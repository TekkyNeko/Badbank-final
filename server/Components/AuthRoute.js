const { Signup, Login } = require("../Components/AuthController");
const { userVerification } = require("../Components/AuthMiddleware")
const {GetBalance} = require("../Components/getBalances");
const { Deposit } = require("./Deposit");
const { Withdraw } = require("./Withdraw");
const { Transfer } = require("./TransferMoney")
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/', userVerification);
router.post('/getbalance', GetBalance);
router.post('/withdraw', Withdraw);
router.post('/deposit', Deposit);
router.post('/transfer', Transfer);
module.exports = router;