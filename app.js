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

app.get('/api/users/:id', (req,res) => {
  console.log(req.params.id);
  const user = {id: req.params.id, name: `user${req.params.id}`};
  res.send(user);
});

// Use the PORT environment variable or default to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
//$env:PORT=1313
//Remove-Item Env:PORT