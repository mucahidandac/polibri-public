var User = require('../models').User;
const bcrypt = require('bcryptjs');

const getUserById = async (req, res) => {
    User.where('id',req.params.id).fetch().then(function(user) {
        if(!user) return res.status(400).json({}); 
        var userJson = user.toJSON();
        delete userJson.password;
        return res.status(200).json(userJson);
    }).catch(function(err) {
        console.error(err);
        return res.status(500).json({});
    }); 
}

const postRegister = async (req, res) => {
    User.where('email',req.body.email)
    .fetch()
    .then(function(user) {
      if (user) {
        res.status(400).json({});
        }else {
            var params = req.body;
            var salt = bcrypt.genSaltSync(10);
            const hashedPass = bcrypt.hashSync(params.password, salt);
            params.password = hashedPass;
            new User().save(params,{method:'insert'})
            .then(function(user2) {
                var userJson = user2.toJSON();
                delete userJson.password;
                res.status(200).json(userJson);
            }).catch(function(err) {
                console.error(err);
                res.status(500).json({});
            });
        }   
    }).catch(function(err) {
        console.error(err);
        return res.status(500).json({});
    });
}

module.exports = {
    getUserById,
    postRegister
}