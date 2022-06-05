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



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});
