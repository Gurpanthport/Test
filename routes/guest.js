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

/* Render the Add Users Page */
router.get('/add', function (req, res, next) {
    res.render('guest/add', {
        title: 'Surveys',
        displayName: req.user ? req.user.displayName : ''
    });
});


/* Render the Add1 Users Page */
router.get('/add1', function (req, res, next) {
    res.render('guest/add1', {
        title: 'Surveys',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* process the submission of a new user */
router.post('/add', function (req, res, next) {
    var survey = new Survey(req.body);

    Survey.create({
        surveyTopic: req.body.surveyTopic,
        surveyQuestion: req.body.surveyQuestion,
        surveyOption1: req.body.surveyOption1,
        surveyOption2: req.body.surveyOption2,
        surveyOption3: req.body.surveyOption3,
        surveyOption4: req.body.surveyOption4,
        provider: 'local',
        created: Date.now(),
        updated: Date.now()
    }, function (err, User) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/guest');
        }
    });
});

/* Render the User Edit Page */
router.get('/:id', function (req, res, next) {
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
            res.render('guest/edit', {
                title: 'Surveys',
                survey: survey,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});


/* run delete on the selected user */
router.get('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    Survey.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/guest');
        }
    });
});



module.exports = router;