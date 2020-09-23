const router = require("express").Router();
const Controller = require("../controllers/controller");
const { checkLogin, pageLogin } = require("../middlewares/login");

router.get("/", checkLogin, Controller.showUsers);

router.get("/register", Controller.registerForm);
router.post("/register", Controller.registerPost);

router.get("/login", pageLogin, Controller.loginForm);

router.post("/login", Controller.loginPost);

router.get("/logout", Controller.logout);


module.exports = router;

// * middleware => intercept aksi di endpoint
// * hook => intercept data do model