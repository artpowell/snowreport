const Joi = require('joi');
const mongoose = require('mongoose');

const SnowReport = mongoose.model('SnowReports', new mongoose.Schema({
    reportDate: { 
        type: Date, 
        required: true 
    },
    state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 2
    },
    resort: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    baseSnowTtl: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 1000
    },
    newSnowTtl: {
        type: Number,
        default: 0,
        min: 0,
        max: 255
    },
    snowCondition: {
        type: String,
        minlength: 0,
        maxlength: 255
    }
}));

function validateSnowReport(report) {
    const schema = {
        reportDate: Joi.date().required(),
        state: Joi.string().min(2).max(2).required(),
        resort: Joi.string().min(3).max(255).required(),
        baseSnowTtl: Joi.number().min(0).max(1000).required(),
        newSnowTtl: Joi.number().min(0).max(255),
        snowCondition: Joi.string().min(0).max(255)
    };

    return Joi.validate(report, schema);
}

exports.SnowReport = SnowReport;
exports.validate = validateSnowReport;