// APOLLO_KEY=service:bots:4cZdZ-xYXdyC-Pf-Nbd9Uw
// MONGODB_USERNAME=tfb414
// MONGODB_PW=Worldofwarmongo1



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://tfb414:Worldofwarmongo1@cluster0.tbttk.mongodb.net";
const client = new MongoClient(uri, { useNewUrlParser: true});

const readGarageCollection = async () => {
    client.connect(async err => {
        const collection = client.db("house").collection("garage");

        const door = await collection.find().toArray();

        const test = door.filter(garageInfo => {
            return garageInfo.door === 'false';
        });
        console.log('test', test);

        console.log('door', door);

        // perform actions on the collection object
        client.close();
    });
};

const addOneToKegsDrank = async () => {
    client.connect(async err => {
        const collection = client.db("house").collection("garage");

        const kegsDrank = await collection.find(
            { kegsDrank : { $exists : true }},
        ).project({kegsDrank: 1}).toArray();

        const numberOfKegsDrank = kegsDrank[0].kegsDrank;

        console.log('numberOfKegsDrank', numberOfKegsDrank);

        // const doc = {kegsDrank: 1};

        // collection.insertOne(doc);

        client.close();
    });
};

module.exports = { client, readGarageCollection, addOneToKegsDrank};
