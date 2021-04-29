const express = require('express')
const app = express();
const exphbs = require('express-handlebars')

//need to install cors
const cors = require('cors')

app.use(express.urlencoded({ extended: true })) //replaces body parser
app.use(express.static('public')) // define where static assets live

app.use(cors())

require('./models/db.js');

// configure the handlebars template engine
app.engine('hbs', exphbs({
    defaultlayout: 'main',
    extname: 'hbs'
}))

//set up author routes
const authorRouter = require('./routes/authorRouter.js')

// send http requests to router
app.use('/', authorRouter);
//handle author-management requests
//the author routes are added onto the end of '/author-management'
app.use('/author-management', authorRouter)

app.all('*', (req, res) => {
    res.send('error')
})

// inform our app to use the template engine
app.set('view engine', 'hbs')



app.listen(process.env.PORT || 3000, () => {
    console.log('The library app is listening')
})