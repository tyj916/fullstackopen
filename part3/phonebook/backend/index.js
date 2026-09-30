require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();

app.use(express.static('dist'));
app.use(express.json());
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}));

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  })
});

app.get('/info', (req, res) => {
  Person.countDocuments({}).then(personsCount => {
    res.send(`
      Phonebook has info for ${personsCount} people
      <br>
      ${new Date()}
    `);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      res.json(person);
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res) => {
  const {name, number} = req.body;

  if (!name) {
    return res.status(400).json({ error: 'missing name' });
  }

  if (!number) {
    return res.status(400).json({ error: 'missing number' });
  }

  const person = new Person({
    name,
    number
  });

  person.save().then(savedPerson => {
    res.json(savedPerson);
  });
});

app.put('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  Person.findByIdAndUpdate(id, updatedData, { new: true }).then(updatedPerson => {
    res.json(updatedPerson);
  });
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(deletedPerson => {
      res.json(deletedPerson);
    })
    .catch(error => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
