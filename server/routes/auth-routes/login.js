const express = require('express');
const { loginUser } = require('../../controllers/auth-controller');
// const authenticateMiddleware = require("../../middleware/auth-middleware")

const router = express.Router();
router.post("/", loginUser);


module.exports = router;