var webdriver = require('selenium-webdriver')
//var chrome = require('selenium-webdriver/chrome'),
var firefox = require('selenium-webdriver/firefox');
const {Builder, By, Key, until} = require('selenium-webdriver');
const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var Students = require('../dbops/users');
const app = require('../app');

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .setFirefoxOptions( /* … */)
    .setChromeOptions( /* … */)
    .build();

const assert = require('chai').assert;
const autentica = require('../passport').autentica;
const navegador = require('../passport').navegador;

var localhost = 'http://localhost:3000';
var container_url = localhost + '/login';


describe ('Conexion a mongoDB',function(){

    it('Conexion a mongo DB', function () {
        mongoose.connect('mongodb://mongou:mongou@socialred-shard-00-00-c1tav.mongodb.net:27017,socialred-shard-00-01-c1tav.mongodb.net:27017,socialred-shard-00-02-c1tav.mongodb.net:27017/socialRed?ssl=true&replicaSet=socialRed-shard-0&authSource=admin&retryWrites=true');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
          console.log('Estamos conectados a mongoDB!!!!');
            
        });
      });
      it('student works!',function(done){
        var s = new Students({username:'krishna'});

        s.save(err => {
            if(err) { return done(); }
            throw new Error('Should generate error!');
          });
        });
       it('Debe cerrar la conexion con mongoDB',function(){
        after(function(done){
            mongoose.connection.close(()=>{
                console.log("Desconectado!!");
                done();
            });
          });

       }) 
          
 });
describe('GET /login', function() {
    it('respuesta de /login', function() {
      request(app)
        .get('/login')
        .set('Accept', 'application/text')
        .expect(200)
        .then(response => {
            assert(response.body.email, 'foo@bar.com')
        }).catch(error => { console.log('caught', error.message); });
    });
  });
   /* it ('should return the user data if user found', function(done){
    request.get('http://localhost:31000/user/500d365abb75e67d0c000006',  
        function (err, res, body) {
        json = JSON.parse (body)
        assert.equal(res.statusCode, 200);
        assert.equal(json._id, '500d365abb75e67d0c000006');
        done();
        
    });*/

describe('GET /registro', function() {
    it('respond with json', function(done) {
      request(app)
        .get('/registro')
        .set('Accept', 'application/text')
        .expect('Content-Type', /text/)
        .expect(200, done);
     
    });
  });