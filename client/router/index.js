/**
 *Created by mayomi.ayandiran on 10/31/17
 */

var express = require('express');
var router = express.Router();

const unirest = require('unirest');

/* GET home page. */
router.get('/', function(req, res, next) {
    unirest.get('https://alc-resource.herokuapp.com/api/resource')
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .end(function (response) {
            res.render('index', { data: response.body});
        });

});

router.post('/add-resource',function(req, res) {
    let params = {
        'title': req.body.title,
        'description': req.body.description,
        'author': req.body.author,
    };


    unirest.post('https://alc-resource.herokuapp.com/api/resource')
       // .headers({'Content-Type': 'multipart/form-data'})
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send(params)
      //  .field('title', req.body.title)
        .end(function (response) {
            if(response && response.body && response.body.data) {
                res.redirect('/');
            }else {
                res.render('add_resource', {message: 'An error occur somewhere'})
            }

        });



});

router.get('/add-resource', function (req, res) {
    res.render('add_resource')
});



router.get('/:resourceId', function(req, res, next) {
    const resourceId = req.params.resourceId;

    unirest.get(`https://alc-resource.herokuapp.com/api/resource/${resourceId}`)
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .end(function (response) {
            res.render('single', { data: response.body.data });
       });

});

module.exports = router;