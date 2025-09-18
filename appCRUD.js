const express = require('express');
const {body, validationResult} = require('express-validator');
let users = require('./users');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');

const debug = require('debug')('app:main');
const dbdebug = require('debug')('app:db');

// Middlewares

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
// app.use(morgan('tiny'));

app.set('view engine', 'ejs');
app.set('views', './views'); // default

// console.log("Application Name: " , config.get('name'));
// console.log("Application Version: " , config.get('version'));
// console.log("SMS: " , config.get('SMS'));
// console.log("SMS_IP: " , config.get('SMS.ip'));
// console.log("SMS_KEY: " , config.get('SMS.key'));

if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  debug('morgan enabled...' );
}

dbdebug("Connected to the database...");

// console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log('app:', app.get('env'));


// app.get('/api/users', (req, res) =>{
//   res.json(users);
// });

app.get('/', (req,res)=>{
  res.render('home.ejs', {name: 'Rali'});
});
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

app.put('/api/users/:id', [
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

app.delete('/api/users/:id', (req,res)=>{
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));