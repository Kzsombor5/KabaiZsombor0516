const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;
 
app.use(express.json());
 

app.get('/', function (req, res) {
  res.send('Fut a backend');
});
 

app.get('/users', function (req, res) {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.status(500).json({ error: 'Hiba' });
    });
});
 

app.post('/users', function (req, res) {
  const ujUser = req.body;
 
  if (!ujUser.id || !ujUser.name || !ujUser.email) {
    res.status(400).json({ error: 'Hiányzik az id vagy name vagy email mező.' });
    return;
  }
 
  axios.post('https://jsonplaceholder.typicode.com/users', ujUser)
    .then(function (response) {
      res.status(201).json(response.data);
    })
    .catch(function (error) {
      res.status(500).json({ error: 'Hiba' });
    });
});
 

app.put('/users/:id', function (req, res) {
  const id = req.params.id;
  const modositas = req.body;
 
  axios.put('https://jsonplaceholder.typicode.com/users/' + id, modositas)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.status(500).json({ error: 'Hiba' });
    });
});
 

app.delete('/users/:id', function (req, res) {
  const id = req.params.id;
 
  axios.delete('https://jsonplaceholder.typicode.com/users/' + id)
    .then(function () {
      res.json({ message: 'Felhasználó törölve: ' + id });
    })
    .catch(function (error) {
      res.status(500).json({ error: 'Hiba.' });
    });
});
 

app.listen(PORT, function () {
  console.log('Fut a szerver http://localhost:' + PORT );
});