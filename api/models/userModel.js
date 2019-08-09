var bookshelf  = require('../utils').bookshelf;

require('./orderModel');

module.exports = bookshelf.model('User', {
    tableName: 'users',
    orders() { return this.hasMany('Order'); },
    verifyPassword: function(password) {
        return this.get('password') === password;
    }
}, {
    byEmail: function(email) {
        return this.forge().query({where:{ email: email }}).fetch();
    }
});