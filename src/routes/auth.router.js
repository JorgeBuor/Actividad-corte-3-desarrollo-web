const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth.controller");
const { isAuthenticated, isGuest } = require("../middlewares/auth.middleware");

router.get("/register", isGuest, controller.showRegister);
router.post("/register", isGuest, controller.register);

router.get("/login", isGuest, controller.showLogin);
router.post("/login", isGuest, controller.login);

router.post("/logout", isAuthenticated, controller.logout);

module.exports = router;
