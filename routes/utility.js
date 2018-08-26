var jwt = require('jsonwebtoken');

function generateToken(id){

return jwt.sign({
    data: {id: id}
  }, 'secret', { expiresIn: '10days' });
};

module.exports.generateToken=generateToken;