const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const userRouter = require('./routes/users');
const homeRouter = require('./routes/home');

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

app.use('/api/users', userRouter);
app.use('/', homeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));