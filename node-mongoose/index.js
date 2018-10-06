const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Tpizza',
        description: 'test'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test'}
        },{ 
            new: true 
        })
        .exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);

        return db.collection('dishes').drop();
    })
    .then(() => {
        return db.close();
    })
    .catch((err) => {
        console.log(err);
    });
    /*
    var newDish = Dishes({
        name: 'Uthappizza',
        description: 'test'
    });

    newDish.save()
        .then((dish) => {
            console.log(dish);

            return Dishes.find({});
        })
        .then((dishes) => {
            console.log(dishes);

            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
*/
});

/*
const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = "mongodb://localhost:27017/conFusion";
const dbname = '';
const connect = mongoose.connect(url, { useNewUrlParser: true });
    //{useMongoClient: true}); use standard mongodb driver to connect to server

connect.then((client) => { //connection is stablished, pass a funtion as parameter
    const db = client.db(dbname);
    console.log('Connected correctly to the server');
    //1 PART
    /*
    var newDish = Dishes({ //specify fields required
        name: 'UthaPizza', 
        description: 'Pizza test'
    });
    newDish.save()
    .then((dish) => {
        console.log(dish);//we get the dish value as callback
        return Dishes.find({});//return all dishes from collection db
    })
    .then((dishes) => {//dishes are available
        console.log(dishes); //should return the dish inserted
        return Dishes.deleteMany({});
        //return db.collection('dishes').drop();
    })
    .then(() => {
        return mongoose.connection.close();
        //return db.close();
    })
    .catch((err) => {
        console.log(err);
    });
    */
// 2 PART
    Dishes.create({
        name: '3-Pizza-Hot',
        description: 'From Brooklyn'
        })
/*
        .then((dish) => {
        console.log(dish);
    
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated description' }
        },  { new: true } //return the updated dish back
        ).exec();
        })

        .then((dish) => {
            console.log(dish);

            dish.comments.push({
                rating: 5,
                commnet: "nice movie",
                author: "eoa"
            });
            return dish.save();
        })
        .then((dish) => {
            console.log(dish);

            return db.collection('dishes').drop();
        })

        .then(() => {
            return db.close();
        })
        
        .catch((err) => {
            console.log(err);
        });
}).catch((err) => {
    console.log(err);
});

*/