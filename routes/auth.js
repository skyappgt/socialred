var express = require('express');
var router = express.Router();
var User = require('../dbops/users');

/* GET home page. */


module.exports = function (passport) {
    router.post('/registro', function (req, res) {
            email = req.body.email;
            username = req.body.usuario;
            password = req.body.passu;
        User.findOne({
            username: username
        }, function (err, doc) {
            if (err) {
                res.status(500).send('error occured')
            } else {
                if (doc) {
                    res.status(500).send('Username already exists')
                } else {
                    var record = new User()
                    record.email = email;
                    record.username = username;
                    record.password = record.hashPassword(password)
                    record.save(function (err, user) {
                        if (err) {
                            res.status(500).send('db error')
                        } else {
                            res.redirect('/login')
                        }
                    })
                }
            }
        })
    });

    

    router.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/perfil',
    }), function (req, res) {
        res.send('hey')
    })
    return router;
};