const mongoose = require('mongoose');
const mongo_uri = process.env.mongo_uri || 'mongodb://localhost:27017/test'
mongoose.connect(mongo_uri).then(() => console.log('Connected'))
        .catch(() => console.log('Error'))

const productSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    }, 
    ratings: {
        type: Array,
        required: false
    }
})

const zipSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    loc: {
        type: Array,
        required: true
    }, 
    pop: {
        type: Number,
        required: false
    },
    state: {
        type: String,
        required: true
    },
})
const productsModel = mongoose.model('products', productSchema, 'inventory');
const zipModel = mongoose.model('zips', zipSchema, 'zipcodes');

// get, post, delete, put

// productsModel.find().then((data) => console.log(data)).catch((err) => console.log(err));
module.exports = {productsModel, zipModel};