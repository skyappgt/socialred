const assert = require('assert');
var expect = require('chai').expect;
var webdriver = require('selenium-webdriver')
//var chrome = require('selenium-webdriver/chrome'),
var firefox = require('selenium-webdriver/firefox');
const {Builder, By, Key, until} = require('selenium-webdriver');
const request = require('supertest');
const app = require('../../app');

var localhost = 'http://localhost:3000';

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .setFirefoxOptions( /* … */)
    .setChromeOptions( /* … */)
    .build();

const { Given, When, Then } = require('cucumber');

  
  Given('go to login page and fill inputs {string} and {string}', function (string, string2) {

    driver.get('http://localhost:3000/login');
    driver.findElement(By.name('username')).sendKeys(string);
    driver.findElement(By.name('password')).sendKeys(string2);
   // driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    
  });

  When('I click in the login button', function () {
    // Write code here that turns the phrase above into concrete actions
    //driver.wait(until.elementLocated(By.name('btnlogin')).click());
    //driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    driver.findElement(By.name('btnlogin')).click();
    
    
  });

  Then('I should go to {string} status {int}', function (string, int) {
     request(app)
        .get(string)
        .set('Accept', 'application/text')
        .expect('Content-Type', /text/)
        .expect(int).then(response => {
            assert.equal(int, 200)
        }).catch(error => { console.log('caught', error.message); });
        
  });


  