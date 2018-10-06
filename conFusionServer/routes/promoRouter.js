//rest api endpoint for /promotions and  /promotions/:promoId
const express = require('express');
const bodyParser = require('body-parser');
const Promotions = require('../models/promotions');

const promotionsRouter = express.Router();
promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')//promotions
.get((req,res,next) => {
    Promotions.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res, next) => {
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));    
})
.put((req,res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req,res, next) => {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

promotionsRouter.route('/:id')
.get((req,res,next) => {
    Promotions.findById(req.params.id)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/' + req.params.id);
})
.put((req,res, next) => {
    Promotions.findByIdAndUpdate(
        req.params.id, 
        { $set: req.body }, 
        { new: true })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Promotions.findByIdAndRemove(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
        res.end('Deleting the promotion: '+req.params.id);
    }, (err) => next(err))
    .catch((err) => next(err));   
});
module.exports = promotionsRouter;