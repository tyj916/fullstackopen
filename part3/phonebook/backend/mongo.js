const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log("Give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.woxm7ne.mongodb.net/phonebook?appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

new Person({
  name: "Arto Hellas", 
  number: "040-123456",
}).save().then(result => {
  console.log('person saved!');
  mongoose.connection.close();
});
