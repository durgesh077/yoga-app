const express =  require('express') ;
const app =  express() ;
const {registerRoute, loginRoute , detailsRoute} = require('./routes') ;
const bodyParser = require('body-parser') ;
const session = require('cookie-session') ;
const path = require('path')

app.use(session({
    secret: process.env.SECRET_KEY ,
    resave: false,
    saveUninitialized: true,
    cookie: {  maxAge :  30000},
}))

app.use(bodyParser.json()) ;
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api/register' , registerRoute ) ;
app.use('/api/login', loginRoute) ;
app.get('/api/logout' , (req , res)=>{
    try{
        req.session = null ;
        res.status(200).send("Logout successfull!");
    }catch(err){
        console.log(err.message??"Logout failed!")
        res.status(501).send(err.message??"Logout failed!") ;
    }
    
})


app.use('/api/', detailsRoute) ;


module.exports =  app  ;