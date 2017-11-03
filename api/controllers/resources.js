/**
 *Created by mayomi.ayandiran on 10/31/17
 */

const Resource = require('../models/resource');
const multer = require('multer');

/**
 * Add a new Resource
 * @param req
 * @param res
 * @returns {Promise.<T>|Promise}
 */

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

let upload = multer({storage: storage}).single('resource');

addResource = (req, res) => {

    upload(req, res, function (err) {
        if (err) {
            return res.json(err);
        }

        const title = req.body.title,
            author = req.body.author,
            description = req.body.description;

        let resource;

        if (req.file) {
            resource = req.file.filename;
        }
        const newResource = Resource({
            author: author,
            title: title,
            description: description,
            resource: resource
        });

        return newResource.save()
            .then((savedResource) => {

                return res.json({
                    status: 'success',
                    message: 'New Resource Successfully Added',
                    data: savedResource
                })
            })
            .catch((error) => {
                return res.json({
                    status: 'failure',
                    message: 'Something went wrong please try again',
                    error: error
                })
            })
    })
};
/**
 * Edit a resource
 * @param req
 * @param res
 * @returns {Promise.<T>|Promise}
 */

editResource = (req, res) => {

    upload(req, res, function (err) {
        if (err) {
            return res.json(err);
        }

        const resource_id = req.params.id;
        const title = req.query.title,
            author = req.query.author,
            description = req.query.description;


        Resource.findOne({_id: resource_id}, function (err, resourd) {
            if(err){
                res.json(err);
            }
            resourd.title = title || resourd.title;
            resourd.description = description;
            resourd.save(function (err, sa) {
                res.json(sa)
            });
        })

    })
};

/**
 * Get a array of all Resources
 * @param req
 * @param res
 * @returns {Promise.<T>|Promise}
 */

getAllResources = (req, res) => {
    return Resource.find({})
        .sort('-createdAt')
        .then((allResource) => {
            if (allResource) {
                res.json({
                    status: 'success',
                    message: 'All resources',
                    data: allResource
                })
            }
        })
        .catch((error) => {
            if (error) {
                res.json({
                    status: 'failure',
                    message: 'Something went wrong please try again',
                    error: error
                })
            }
        })
};

/**
 * get one resource
 * @param req
 * @param res
 * @returns {Promise.<T>|Promise}
 */

getOneResource = (req, res) => {
    return Resource.findById(req.params.id)
        .then((oneResource) => {
            if (oneResource) {
                res.json({
                    status: 'success',
                    message: 'one resource',
                    data: oneResource
                })
            }
        })
        .catch((error) => {
            if (error) {
                res.json({
                    status: 'failure',
                    message: 'Something went wrong please try again',
                    error: error
                })
            }
        })
};

/**
 * Delete a resource
 * @param req
 * @param res
 * @returns {Promise.<T>|Promise}
 */

deleteResource = (req, res) => {
    return Resource.findOneAndRemove(req.params.id)
        .then((deleted) => {
            if (deleted) {
            }
            res.json({
                status: 'success',
                message: 'Resource successfully deleted'
            })
        }).catch((error) => {
            if (error) {
                res.json({
                    status: 'failure',
                    message: 'Something went wrong please try again',
                    error: error
                })
            }
        })
};


module.exports = {
    addResource,
    editResource,
    getAllResources,
    getOneResource,
    deleteResource
};