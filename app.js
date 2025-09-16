const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/api/users', (req, res) => {
  res.send([
    {id: 1, name: 'user1'},
    {id: 2, name: 'user2'},
    {id: 3, name: 'user3'}
  ]);
});

app.listen(3000, () => console.log('Listening on port 3000' ));