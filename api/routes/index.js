var express = require('express');
var router = express.Router();


/* GET home page. */

const ResourceController = require('../controllers/resources');


router.post('/resource', ResourceController.addResource);

router.patch('/resource/:id', ResourceController.editResource);

router.get('/resource', ResourceController.getAllResources);

router.get('/resource/:id', ResourceController.getOneResource);

router.delete('/resource/:id', ResourceController.deleteResource);




module.exports = router;
