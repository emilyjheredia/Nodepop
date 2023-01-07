var express = require('express');
var router = express.Router();
const { query, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


//Route parameters
router.get('/api/products', [
  query('name').isAlpha().withMessage('must be text'),
  query('sale').isBoolean().withMessage('must be boolean'),
  query('price').isNumeric().withMessage('must be numeric'),
  query('tag').isAlpha().withMessage('must be text'),
], (req, res, next) => {
  validationResult(req).throw();
  console.log(req.query);
  const name = req.query.name;
  const sale = req.query.sale;
  const price = req.query.price;
  const tag = req.query.tag;
  res.send('Successful validation!');
})



module.exports = router;
