const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}));

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  res.send(`
    Phonebook has info for ${persons.length} people
    <br>
    ${new Date()}
  `);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id === id);

  if (!person) {
    res.status(404).end();
  } else {
    res.json(person);
  }
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: 'missing name'
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'missing number'
    });
  }

  const isNameInPhonebook = persons.some(person => person.name === body.name);

  if (isNameInPhonebook) {
    return res.status(400).json({
      error: 'name already exists in the phonebook'
    });
  }

  const person = {
    id: Math.random().toString(36).substring(2, 11),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person);
  
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
