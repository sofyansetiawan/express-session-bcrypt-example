const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");

class Controller {

    static showUsers(req, res) {
        User.findAll()
        .then(users => {
            res.render("showUsers", { users });
        })
        .catch(err => {
            res.send(err);
        })
    }

    static registerForm(req, res) {
        const errors = req.session.errors || null;
        delete req.session.errors;
        res.render("registerForm", { errors });
    }

    static registerPost(req, res){
        const { username, email, password, confirm_password} = req.body;

        if(password != confirm_password){
            req.session.errors = `Password dan Confirm Password tidak sama`;
            res.redirect("/users/register");
        }
        else{
            const newUser = {
                username, email, password
            }

            User.create(newUser)
            .then(result => {
                res.redirect("/users")
            })
            .catch(err => {
                req.session.errors = err.messages;
                res.redirect("/users/register");
            })
        }
    }

    static loginForm(req, res) {
        const errors = req.session.errors || null;
        delete req.session.errors;
        res.render("loginForm", { errors });
    }

    static loginPost(req, res){
        const { email, password } = req.body;

        User.findOne({
            where: {
                email
            }
        })
        .then(result => {
            if(result){
                console.log(result.password)
                if(compare(password, result.password)){
                    req.session.isLogin = true;
                    res.redirect("/users");
                }
                else{
                    req.session.isLogin = false;
                    req.session.errors = `Password untuk email tersebut tidak sesuai`;
                    res.redirect("/users/login");
                }
            }else{
                req.session.isLogin = false;
                req.session.errors = `Email tidak ditemukan`;
                res.redirect("/users/login");
            }
        })
        .catch(err => {
            req.session.errors = err.messages;
            res.redirect("/users/login");
        })
    }

    static logout(req, res){
        // aksi state tidak login
        delete req.session.isLogin;
        res.redirect("/users/login");
    }
}

module.exports = Controller;