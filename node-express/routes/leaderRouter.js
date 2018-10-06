//rest api endpoint for /leaders and /leaders/:leaderId
const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the Leaders to you.');
})
.post((req,res, next) => {
    res.end('Will add the leader: '+ req.body.name + ' with details: '+req.body.description);
})
.put((req,res, next) => {
    res.statusCode = 403;
    res.end('Operation not supported on /leaders');
})
.delete((req,res, next) => {
    res.end('Deleting all the leaders!');
});

leaderRouter.route('/:id')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
        res.end('Will send details of the leader: '+
        req.params.id + ' to you!');
})
.post((req,res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/' + req.params.id);
})
.put((req,res, next) => {
    res.write('Updating the leader:'+ req.params.id);
    res.end('\nWill update the leader: '+ req.body.name+ ' with details ' +req.body.description);
})
.delete((req,res, next) => {
    res.end('Deleting the leader: '+req.params.id);
});
module.exports = leaderRouter;