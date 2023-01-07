'use strict';

const mongoose = require('mongoose');

// Define the scheme
const productSchema = mongoose.Schema({
    name: { type: String, unique: true },
    sale: { type: Boolean },
    price: { type: Number, index: true, min: 10, max: 1000 },
    photo: { type: String },
    tags: {type: [String], index: true}
}, {colecction: 'products'});

//Create the static method
productSchema.statics.lista = function(filter, skip, limit, fields, sort) {
    const query = Product.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec()

}

//GET /api/products/tags
productSchema.statics.listTags = function(){
    const query = Product.distinct('tags'); 
    return query.exec(); 
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

