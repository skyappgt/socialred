/*const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const {url} = require('../config/dbase');
var db = mongoose.connect(url,
  { useNewUrlParser: true

})
.catch((error) => { console.log(error); });

const usrSchem = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  nombreu: String,
  passu: String

});
usrSchem.methods.genHash = function(pass){
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);
}
usrSchem.methods.validarPass = function(pass){
  return bcrypt.compareSync(pass, this.local.pass);
}

var usuarios = mongoose.model('usuarios', usrSchem );
module.exports = usuarios;*/
