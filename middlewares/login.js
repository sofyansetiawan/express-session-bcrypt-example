function checkLogin (req, res, next){
    if(req.session.isLogin){
        next();
    }
    else{
        req.session.errors = `Tidak memiliki akses ke halaman tersebut`;
        res.redirect("/users/login");
    }
}

function pageLogin(req, res, next) {
    if(req.session.isLogin){
        res.redirect("/users/");
    }
    else{
        next();
    }
}

module.exports = { checkLogin, pageLogin};