const express = require('express');
const res = require('express/lib/response');
const app = express();
app.use(express.json());

let phones = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}


app.get('/', (req, res) => {
    res.send('<h1>Testin phone</h1>')
});

app.get('/api/persons', (req, res) => {
    res.json(phones);
})

app.get('/api/persons/:id', (req, res) => {
  let id = +req.params.id;
  let note = phones.find(elem => elem.id === id);

  (note)
    ? res.json(note)
    : res.status(404).end();
  
})

app.get('/info', (req, res) => {
  let date = new Date();
  res.send(
    `<p>The phonebook has ${phones.length} entries
     <p>${date}</p>`
  ) 
})

app.delete('/api/persons/:id', (req, res) => {
  let id = +req.params.id;
  phones = phones.filter(note => note.id !== id);

  res.status(204).end();
})

app.post('/api/persons', (req, res) => {
  let body = req.body;

  if(!body.name || !body.number) {
    return res.status(400).json({
      error: 'Missing name or number'
    })
  } else if (phones.filter(note => note.name === body.name).length !== 0) {
    return res.status(400).json({
      error: 'Name must be unique'
    })
  }

  let note = {
    id: getRandom(1, 1000),
    name: body.name,
    number: body.number
  }
  phones = phones.concat(note);
  
  res.json(note)
})


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});
