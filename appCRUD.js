const express = require('express');
let users = require('./users');
const app = express();

// app.get('/api/users', (req, res) =>{
//   res.json(users);
// });

app.get('/api/users', (req, res) =>{
  res.json({
    data: users, 
    message: 'ok'
  });
});

//http://localhost:3000/api/users/3
//http://localhost:3000/api/users/23
app.get('/api/users/:id', (req, res)=>{
   const user = users.find(u => u.id === parseInt(req.params.id)); 
  //  if(!user) return res.status(404).send('The user with the given ID was not found.');
    if(!user) return res.status(404).json({
      error: 'The user with the given ID was not found.'
   });  
   res.status(200).json({
      data: user, 
      message: 'ok'
   });
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));