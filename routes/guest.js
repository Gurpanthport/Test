var express = require('express');
var router = express.Router();

var Survey = require('../models/survey');

/* Render Users main page. */
router.get('/', function (req, res, next) {
    Survey.find(function (err, surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('guest/index', {
                title: 'Users',
                surveys: surveys,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

/* Render the User Edit Page */
router.get('/live/:id', function (req, res, next) {
    // create an id variable
    var id = req.params.id;
    // use mongoose and our model to find the right user
    Survey.findById(id, function (err, survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('guest/live', {
                title: 'Surveys',
                survey: survey,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});



module.exports = router;