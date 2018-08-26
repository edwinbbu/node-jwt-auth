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
        type: String,
        required:true
    },
    password: { 
        type: String,
        required:true
    },
    active: {
        type: Boolean,
        required:true
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },

});
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    console.log("compare:",bcrypt.compareSync(password, this.password));
    return bcrypt.compareSync(password, this.password);
};

var User = module.exports = mongoose.model('User', UserSchema);