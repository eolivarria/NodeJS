//rest api endpoint for /promotions and  /promotions/:promoId
const express = require('express');
const bodyParser = require('body-parser');
const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());
promotionsRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the Promotions to you.');
})
.post((req,res, next) => {
    res.end('Will add the promotion: '+ req.body.name + ' with details: '+req.body.description);
})
.put((req,res, next) => {
    res.statusCode = 403;
    res.end('Operation not supported on /promotions');
})
.delete((req,res, next) => {
    res.end('Deleting all the promotions!');
});

promotionsRouter.route('/:id')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
        res.end('Will send details of the promotion: '+
        req.params.id + ' to you!');
})
.post((req,res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/' + req.params.id);
})
.put((req,res, next) => {
    res.write('Updating the promotion:'+ req.params.id);
    res.end('\nWill update the promotion: '+ req.body.name+ ' with details ' +req.body.description);
})
.delete((req,res, next) => {
    res.end('Deleting the promotion: '+req.params.id);
});
module.exports = promotionsRouter;