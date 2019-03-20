
let configuration = require('../../configuration/config');

var mongoose = require('mongoose');
mongoose.connect(configuration.db.mongodb.connection_string);



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("connected");

    var kittySchema = new mongoose.Schema({
        name: String
    });

    // NOTE: methods must be added to the schema before compiling it with mongoose.model()
    kittySchema.methods.speak = function () {
        var greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    }


    var Kitten = mongoose.model('recipe', kittySchema);

    var silence = new Kitten({ name: 'Silence' });
    console.log(silence.name); // 'Silence'


    var Kitten = mongoose.model('recipe', kittySchema);

    var fluffy = new Kitten({ name: 'fluffy' });
    fluffy.speak(); // "Meow name is fluffy"

    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();

        Kitten.find(function (err, kittens) {
            if (err) return console.error(err);
            console.log(kittens);
            mongoose.disconnect(()=>{ console.log('disconnect');});
        });

      //  Kitten.find({ name: /^fluff/ }, (x)=>console.log(x));

    });

    mongoose.disconnect(()=>{ console.log('disconnect');});
});

module.exports = () =>{

    let db_connection = mongoose.connection;
    return {


    }
};

var MongoClient = require('mongodb').MongoClient;

var state = {
    db: null,
};

exports.connect = function(url, done) {
    if (state.db) return done();

    MongoClient.connect(url, function(err, db) {
        if (err) return done(err);
        state.db = db;
        done()
    })
};

exports.get = function() {
    return state.db
};

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null;
            state.mode = null;
            done(err)
        })
    }
};