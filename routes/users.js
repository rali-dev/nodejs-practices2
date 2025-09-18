const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
let users = require('../users');

router.get('/', (req, res) =>{
  res.json({
    data: users, 
    message: 'ok'
  });
});

router.get('/:id', (req, res)=>{
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

router.post('/', [
    body('email', 'Invalid email').isEmail(),
    body('first_name', 'First name is required').notEmpty().isLength({min: 2}),
    body('last_name', 'Last name is required').notEmpty().isLength({min: 2}),
 ],(req, res)=>{
  // return console.log(req.body);
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

router.put('/:id', [
    body('email', 'Invalid email').isEmail(),
    body('first_name', 'First name is required').notEmpty().isLength({min: 2}),
    body('last_name', 'Last name is required').notEmpty().isLength({min: 2}),
 ],(req, res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array(), message: 'Invalid data'});
  }
  const user = users.find(u => u.id === parseInt(req.params.id));
  if(!user) return res.status(404).json({
    data: null,
    message: 'The user with the given ID was not found.'
  })
  users = users.map(user => {
    if(user.id === parseInt(req.params.id)){
      return {...user, ...req.body}
    }
    return user;
  })
  res.json({
    data: users, 
    message: 'ok'
  });
});

router.delete('/:id', (req,res)=>{
   const user = users.find(u => u.id === parseInt(req.params.id));
   if(!user) return res.status(404).json({
      data: null,
      message: 'The user with the given ID was not found.'
   });
   const index = users.indexOf(user);
   users.splice(index, 1);
   res.json({
      data: users, 
      message: 'ok'
   });
});

module.exports = router;