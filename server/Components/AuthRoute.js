const { Signup, Login } = require("../Components/AuthController");
const { userVerification } = require("../Components/AuthMiddleware")
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/', userVerification);

module.exports = router;