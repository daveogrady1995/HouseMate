const express = require('express');
const rp = require('request-promise');
const cheerio = require('cheerio');
const router = express.Router();
var https = require('https');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

var soap = require('soap');
var apiWSDL = 'https://api.daft.ie/v2/wsdl.xml';

var args = {
     //'api_key': '67c7bc238dce710e9c3f3f4a8e301d30bc46cf30',
     //query: { "bedrooms": 4, "perpage":60},
}

const options = {
    uri: `https://touch.daft.ie/search/results?search%5Bareas%5D%5B%5D=%7B%22id%22%3A22%2C%22name%22%3A%22Co.+Sligo%22%2C%22type%22%3A%22county%22%7D&search%5Bad-type%5D=rental&search%5Bsale-or-rental%5D=&search%5Bmin-price%5D=&search%5Bmax-price%5D=&search%5Bmin-bed%5D=&search%5Bmax-bed%5D=&search%5Bmin-size%5D=&search%5Bmax-size%5D=&search%5Bmin-bath%5D=&search%5Bmax-bath%5D=&search%5Broom%5D=&search%5Bsort%5D=best-match&search%5Baddress%5D=`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

// Connect
/*const connection = (closure) => {
    return MongoClient.connect('mongodb://dave1633:rocky101@ds241395.mlab.com:41395/housemateapp', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};*/

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
/*router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});*/

router.get('/flats', (req, res) => {
    soap.createClient(apiWSDL, function(err, client) {
        console.log(client);
        client.DaftAPIService.DaftAPIService.search_sale(args, function(err, result) {
        //client.search_sale(args,function(err, result) {
            console.log(result);
            response.data = result;
            res.json(response);
        });
    });

});

router.get('/test', (req, res) => {

    var propertyList = {};

    rp(options)
        .then(($) => {
            $('.property-row').each(function(index, element){
                var price = $(element).find('.price').text();
                var address = $(element).find('.address').text();
                propertyList[index] = {price: price, address: address.trim()};
              });
              response.data = propertyList;
              res.json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;