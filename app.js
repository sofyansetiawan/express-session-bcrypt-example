const express = require("express");
const router = require("./routers");
const session = require("express-session");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'PHKGFYRVETE',
    resave: false,
    saveUninitialized: true
  }))

app.use("/", router);

app.listen(PORT, () => {
    console.log(`APPS BERJALAN DI ${PORT}`);
});

// * req.app.locals
// * req.session

// * sofyan => njakshjdbasbhdasd-isLogin = true; - req.session
// * leonard => njakshjdbasbhdasd-isLogin = true;