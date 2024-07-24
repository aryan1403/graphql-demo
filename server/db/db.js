const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/trainingdb').then(() => console.log('Connected'))
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
    rating: {
        type: Array,
        required: false
    }
})
const productsModel = mongoose.model('products', productSchema, 'inventory');

productsModel.find().then((data) => console.log(data)).catch((err) => console.log(err));