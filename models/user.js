var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
    firstName: { 
        type: String,
        //required:true
    },
    lastName: { 
        type: String,
        //required:true
    },
    username: { 
        type: String,
        required:true
    },
    gender: { 
        type: String,
        //required:true
    },
    email: { 
        type: String,
        required:true
    },
    mobile: { 
        type: Number,
        //required:true
    },
    password: { 
        type: String,
        required:true
    },
    active: {
        type: Boolean,
        required:true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    verifyCode: { 
        type: Number
    },

});
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = module.exports = mongoose.model('User', UserSchema);