const express = require('express');
const path = require('path');
const exphbs= require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./members');


const app = express();
//init middleware
//app.use(logger);

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser middleware
app.use(express.json());
//handle form submission
app.use(express.urlencoded({extended: false}));


//home page route
app.get('/', (req, res) => res.render('index', {
  title: 'Member App',
  members
}));

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(5000, ()=> console.log(`Server started on port ${PORT}`));
