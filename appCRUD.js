const express = require('express');
const {body, validationResult} = require('express-validator');
let users = require('./users');
const app = express();

app.use(express.json());

// app.get('/api/users', (req, res) =>{
//   res.json(users);
// });

app.get('/api/users', (req, res) =>{
  res.json({
    data: users, 
    message: 'ok'
  });
});

app.get('/api/users/:id', (req, res)=>{
   const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).json({
      data: null,
      message: 'The user with the given ID was not found.'
   });  
   res.status(200).json({
      data: user, 
      message: 'ok'
   });
})

app.post('/api/users', [
    body('email', 'Invalid email').isEmail(),
    body('first_name', 'First name is required').notEmpty().isLength({min: 2}),
    body('last_name', 'Last name is required').notEmpty().isLength({min: 2}),
],(req, res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array(), message: 'Invalid data'});
  }
  users.push({id: users.length + 1, ...req.body});
  res.json({
    data: users, 
    message: 'ok'
  });
});  

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));