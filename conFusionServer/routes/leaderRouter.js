//rest api endpoint for /leaders and /leaders/:leaderId
const express = require('express');
const bodyParser = require('body-parser');

const Leaders = require('../models/leaders');
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
.get((req,res,next) => {
    Leaders.find({}) //from express server access mongodb
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res, next) => {
    Leaders.create(req.body)
    .then((leader) => {
        console.log('Leader Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res, next) => {
    res.statusCode = 403;
    res.end('Operation not supported on /leaders');
})
.delete((req,res, next) => {
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
    res.end('Deleting all the leaders!');
});

leaderRouter.route('/:id')
.get((req,res,next) => {
    Leaders.findById(req.params.id)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/' + req.params.id);
})
.put((req,res, next) => {
    Leaders.findByIdAndUpdate(
        req.params.id, 
        { $set: req.body }, 
        { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res, next) => {
    Leaders.findByIdAndRemove(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
    res.end('Deleting the leader: '+req.params.id);
});
module.exports = leaderRouter;