'use strict';

const express = require('express');
const createError = require('http-errors');
const Product = require('../../models/Product');


const router = express.Router();


// GET /api/products
router.get('/', async (req, res, next) => {

    try {
        // filters
        const name = req.query.name;
        const sale = req.query.sale;
        const price = req.query.price;
        const tags = req.query.tags;

        //pagination
        const skip = req.query.skip;
        const limit = req.query.limit;

        //fields
        const fields = req.query.fields; //  /api/products?fields=name

        //sort
        const sort = req.query.sort; //  /api/products?sort=age%20name


        const filter = {};

        if (name) {
            filter.name = new RegExp('^' + name, "i");
        }
        

        if (sale) {
            filter.sale = sale;
        }


        if (tags) {
            filter.tags = {$in: tags};
        }


        if (price) {
            if (price.includes('-')) {
                const prices = price.split('-');
                if(prices[0] === '') {
                    filter.price = {$lte: prices[1]};
                } else if (prices[1] === '') {
                    filter.price = {$gte: prices[1]};
                } else {
                    filter.price = {$gte: prices[0], $lte: prices[1]}
                }
            } else {
                filter.price = price;
            }
        }

        const products = await Product.lista(filter, skip, limit, fields, sort);
        res.json({ results: products });

    } catch(err) {
        next(err);
    }  
});


/*
router.get('/:images', function(req, res){
    res.sendFile( __dirname+`/images/${images}` );});

*/


// GET /api/products/tags

router.get('/tags', async (req, res, next) => {
    try{
        const existingTags = await Product.listTags();
        res.json({ tags: existingTags });
    }catch(err){
        next(err);
    }
});

module.exports = router;



/*
var product1 = new Product({name: 'Perfum', sale: true, price: 265, photo: 'Perfum.png', tags: ['lifestyle']})

product1.save(function (err, product) {
    if (err) return console.error(err);
    console.log('Product ' + product.name + ' create')
})

Product.find((err, products) =>  {
    console.log(products)
})
*/