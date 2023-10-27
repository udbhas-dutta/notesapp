require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');


const app = express();
const port = 5000 || process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//static files
app.use(express.static('public'));

//templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// routes
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

app.listen(port, ()=>{
    console.log(`App listening at port ${port}`);
})

//last route : handle 404
app.get('*', (req,res)=>{
    res.status(404).render('404')
})



