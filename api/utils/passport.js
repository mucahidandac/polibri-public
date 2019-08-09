const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
var User = require('../models').User;

passport.use(new LocalStrategy({
    usernameField:"email", 
    passwordField:"password"
}, async (email, password, done) => {

        User.where('email',email).fetch().then (function (user) {
            if (user != null){
                var userJson = user.toJSON();

                bcrypt.compare(password, userJson.password, (err, isValid) => {
                    if (err) {
                        return done(err, false, {message:err});
                    }
                    if (!isValid) {
                        return done(null, false,{message:'Password is wrong'});
                    }
                    return done(null, user);
                });
            } else{
                return done(null, false,{message:'User not found'}); //User not found
            }  
        }).catch(function(err) {
            return done(err, false, {message:err});
        });
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport;