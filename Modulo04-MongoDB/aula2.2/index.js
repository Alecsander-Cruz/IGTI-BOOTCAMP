const MongoClient = require('mongodb').MongoClient;

const uri =
  'mongodb+srv://alecsandercruz:g4l3g0ss@alecsander-igtibootcamp-fullstack-ofsjp.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

client.connect(async (err) => {
  const collection = client.db('grades').collection('student');

  // const documents = await collection.find({ subject: 'Matemática' }).toArray();

  // console.log(documents);

  const databaseList = await client.db().admin().listDatabases();

  console.log('Databases: ');

  databaseList.databases.forEach((db) => {
    console.log(` - ${db.name}`);
  });

  client.close();
});
