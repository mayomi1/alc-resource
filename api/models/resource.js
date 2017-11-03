/**
 *Created by mayomi.ayandiran on 10/31/17
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//= ===============================
// Resource Schema
//= ===============================
const ResourceSchema = new Schema({
        author: {
            type: String
        },
        title: {
            type: String,
        },
        description: {
            type: String
        },
        resource: {
            type: String
        }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Resource', ResourceSchema);