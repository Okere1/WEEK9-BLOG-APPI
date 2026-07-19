const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const router = express.Router();
const validate = require("../middlewares/validateSchema");

const {
  registerSchema,
  loginSchema,
} = require("../validation/user.validation");

router.post("/sign-up", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

module.exports = router;
