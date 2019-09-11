var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const {url} = require('../config/dbase');

var db = mongoose.connect(url,
  { useNewUrlParser: true

})
.catch((error) => { console.log(error); });  

const User = new Schema({
 // _id: mongoose.Schema.Types.ObjectId,
  email: {
    type:String,
    required:true},
  username:{
    type:String,
    required:true,
  },
  password: {
    type: String,
    required: true,
  },
  perfil:{
    name: String,
    lastname: String,
    city: String,
    ocupa: String,
    perfimg:{ data: Buffer, contentType: String  }
  },
  blog:{
    fcoment:Date,
    coment:String,
    blogimg:{
       data: Buffer, contentType: String  
    }
  }
});

User.methods.hashPassword = function (password) {
  return bcrypt.hashSync(password)
}

User.methods.comparePassword = function (password,hash) {
  return bcrypt.compareSync(password,hash)
}
/*
module.exports.verifyPassword = function(pass, hash, callb){
  if(bcrypt.compareSync(pass, hash, function(err, match){
      if (err) throw err; console.log(err)
      callb(null, match);
  }));
}
*/



module.exports = mongoose.model('usuarios', User, 'usuarios');
