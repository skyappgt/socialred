var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const {url} = require('../config/dbase');

var db = mongoose.connect(url,
  { useNewUrlParser: true

})
.catch((error) => { console.log(error); });  



const coment = new Schema({
  id:String,
  username:String,
  coment:String,
  fcoment:Date
})

module.exports = mongoose.model('posts', coment, 'posts');