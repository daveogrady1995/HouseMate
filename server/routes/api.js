const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://dave1633:rocky101@ds241395.mlab.com:41395/housemateapp', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

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
router.get('/users', (req, res) => {
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
});

module.exports = router;

// const User = require('../../models/user.js')

// // Register
// router.post('/register', (req, res, next) => {
//     let newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         username: req.body.username,
//         passport: req.body.password
//     });

//     User.addUser(newUser, (err, user) => {
//         if(err){
//             res.json({success: false, msg:'failed to register user'});
//         } else {
//             res.json({success: true, msg:'user registered'});
//         }
//     });
// });

// // Authenticate
// router.get('/authenticate', (req, res, next) => {
//     res.send('AUTHENTICATE');
// });

// // Profile
// router.get('/profile', (req, res, next) => {
//     res.send('PROFILE');
// });

// // Validate
// router.get('/validate', (req, res, next) => {
//     res.send('VALIDATE');
// });

// module.exports = router;