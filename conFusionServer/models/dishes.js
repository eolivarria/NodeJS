const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);//currency added to mongoose
var Currency = mongoose.Types.Currency;//new type

const Schema = mongoose.Schema;

var commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const dishSchema = new Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    }, 
    description: {
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    label: {
        type:String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    comments:[commentSchema]
},{
    timestamp: true //created at, updated at timestamps
});

var Dishes = mongoose.model('Dish', dishSchema);
module.exports = Dishes;