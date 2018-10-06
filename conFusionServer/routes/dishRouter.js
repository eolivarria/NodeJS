//rest api endpoint for /dishes end /dishes/:id
const express = require('express');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const Dishes = require('../models/dishes');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/') // /dishes
.get((req, res, next) => {
    Dishes.find({}) //from express server access mongodb
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        //res.end(JSON.stringify(dishes));
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Dishes.create(req.body)
    .then((dish) => {
        console.log('Dish Created ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
        //res.end(JSON.stringify(dish));
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    Dishes.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:id')
.get((req, res, next) => {
    Dishes.findById(req.params.id)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+req.params.id);
})
.put((req, res, next) => {
    Dishes.findByIdAndUpdate(
        req.params.id, 
        { $set: req.body }, 
        { new: true })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
        res.end('Deleting the dish: '+req.params.id);
    }, (err) => next(err))
    .catch((err) => next(err));
});

//PART 2
dishRouter.route('/:id/comments')// /dishes
.get((req, res, next) => {
    Dishes.findById(req.params.id) //from express server access mongodb
    .then((dish) => {
        if(dish != null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
        }else{
            err = new Error('Dish '+req.params.id+' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Dishes.findById(req.params.id)
    .then((dish) => {
        if(dish != null){
            dish.comments.push(req.body);
            dish.save()
            .then((dish)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })
        }else{
            err = new Error('Dish '+req.params.id+' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes/'+req.params.id+'/comments');
})
.delete((req, res, next) => {
    Dishes.findById(req.params.id)
    .then((dish) => {
        if(dish != null){
            for(var i = (dish.comments.length-1); i>= 0; i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err));
    
        }else{
            err = new Error('Dish '+req.params.id+' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


dishRouter.route('/:id/comments/:commentID')
.get((req, res, next) => {
    Dishes.findById(req.params.id)
    .then((dish) => {
        if(dish != null && dish.comments.id(req.params.commentID) != null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentID));
        }else if(dish === null){
            err = new Error('Dish '+req.params.id+' not found');
            err.status = 404;
            return next(err);
        }else{
            err = new Error('Comment '+req.params.commentID+' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+req.params.id+'/comments/'+req.params.commentID);
})
.put((req, res, next) => {
    Dishes.findById(req.params.id)
    .then((dish) => {
        if(dish != null && dish.comments.id(req.params.commentID) != null){
            if(req.body.rating){
                dish.comments.id(req.params.commentID).rating = req.body.rating;
            }
            if(req.body.comment){
                dish.comments.id(req.params.commentID).comment = req.body.comment;
            }
            dish.save()
            .then((dish)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err));
        }else if(dish === null){
            err = new Error('Dish '+req.params.id+' not found');
            err.status = 404;
            return next(err);
        }else{
            err = new Error('Comment '+req.params.commentID+' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Dishes.findById(req.params.id)
    .then((dish) => {
        if(dish != null && dish.comments.id(req.params.commentID) != null){
                dish.comments.id(req.params.commentID).remove();
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err));
        }else if(dish === null){
            err = new Error('Dish '+req.params.id+' not found');
            err.status = 404;
            return next(err);
        }else{
            err = new Error('Comment '+req.params.commentID+' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = dishRouter;
/*
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes to you.');
})
.post((req,res, next) => {
    res.end('Will add the dish: '+ req.body.name + ' with details: '+req.body.description);
})
.put((req,res, next) => {
    res.statusCode = 403;
    res.end('Operation not supported on /dishes');
})
.delete((req,res, next) => {
    res.end('Deleting all the dishes!');
});
----------------------------------------------------------------
dishRouter.route('/:id')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
        res.end('Will send details of the dish: '+
        req.params.id + ' to you!');
})
.post((req,res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.id);
})
.put((req,res, next) => {
    res.write('Updating the dish:'+ req.params.id);
    res.end('\nWill update the dish: '+ req.body.name+ ' with details ' +req.body.description);
})
.delete((req,res, next) => {
    res.end('Deleting the dish: '+req.params.id);
});
------------------------------------------------------------------

app.all('/dishes', (req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
});

app.get('/dishes', (req,res,next) => {
    res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
 res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes');
});
 
app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: '+
    req.params.dishId + 'to you!');
});
app.post('/dishes/:dishId', (req,res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
});
app.put('/dishes/:dishId', (req,res, next) => {
    res.write('Updating the dish:'+ req.params.dishId);
    res.end('Will update the dish: '+ req.body.name+ ' with details ' +req.body.description);
});
app.delete('/dishes/:dishId', (req,res, next) => {
    res.end('Deleting the dish: '+req.params.dishId);
});
*/