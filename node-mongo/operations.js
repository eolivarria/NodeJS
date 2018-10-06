const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => { 
    return db.collection(collection).insertOne(document); 
};
    /*
    , (err, res)=>{
        assert.equal(err,null);
        console.log("Inserted "+res.result.n+
        " documents into the collection "+collection);
        callback(res);
    }
    */
exports.findDocuments = (db, collection, callback) => {
    return db.collection(collection).find({}).toArray();
};
/**
(err, docs)=>{
        assert.equal(err,null);
        callback(docs);
    }
 */
exports.removeDocument = (db, document, collection, callback) => {
    return db.collection(collection).deleteOne(document)
};
/*
, (err, res)=>{
        assert.equal(err,null);
        console.log("Remove the document ",document);
        callback(res);
    }
*/
exports.updateDocument = (db, document, update, collection, callback) => {
    return db.collection(collection).updateOne(document, { $set: update}, null)
};
/*
, (err, res)=>{
        assert.equal(err,null);
        console.log("Updated the document with ", update);
        callback(res);
    }
*/