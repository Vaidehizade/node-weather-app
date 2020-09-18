const chalk =require('chalk')
const path = require('path')
const express = require('express') //express is actually a function   
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')
//console.log(__dirname)  //both are provided by wrapper function
//console.log(path.join(__dirname, '../public'))

const app = express ()
//define paths for express config
const port = process.env.PORT || 3000
const publicDirectorypath =path.join(__dirname, '../public')
//serve up the directory
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handle bars engine and view location
app.set('view engine','hbs')  //to handle bars set up
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectorypath))                                     //its a way to customize ur server

app.get('',(req,res) =>{
    res.render('index',  {
        title: 'Weather',
        name: 'Vaidehi Zade'
    })       //we can render our handle bars template
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'flower',
        name: 'Vaidehi Zade'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This is some useful text',
        title: 'Help',
        name: 'Vaidehi Zade'
    })
})

app.get('', (req,res)=>{  //root page
     res.send('<h1>Weather</h1>')
})

/*app.get('/help', (req,res)=>{

    res.send([{
   name: 'Vaidehi',  //json could be an array also
    },   
    {
        name: 'isha'
    }])

})*/

//app.get('/about', (req,res)=>{
 //   res.send('<h2><i>info about page</i></h2>')
//})

app.get('/weather',(req,res) =>{
     if(!req.query.address){
         return res.send({
             error: 'Add address plz!'
         })
     }
   //console.log(req.query.address)
   geocode(req.query.address, (error,{latitude,longitude, location} ={}) =>{
       if(error)
       {
           return res.send({error: error})
       }
       
       forecast(latitude,longitude, (error, forecastdata) =>{
           if(error)
           {
               return res.send({error: error})
           }
           res.send({
               forecast: forecastdata,
               location: location,
               address: req.query.address
           })

       })

   })
  /* res.send({
       forecast: 'It is snowing',
       location: 'Delhi' ,
       address: geocode //json means either we have to provide json or an object
   })*/
})
 
app.get('/products',(req,res)=>{
       if(!req.query.search){
          return res.send({
               error:'You must provide a search term'
           })

       } 
    console.log(req.query.search)  //request object has query property inside
    res.send({
        products: []        //query string start at the end of URL  it start with question marks
    })
})

app.get('/help/*',(req,res) =>{
    //res.send('help article not found!')
    res.render('404',{
        title: '404',
        name: 'Vaidehi Zade',
        errorMessage: 'help article not found.'
    })
})

app.get('*',(req,res) =>{      //* wildcard to match a wide range of urls
    //res.send("My 404 page")
    res.render('404',{
        title: '404',
        name: 'Vaidehi Zade',
        errorMessage: 'Page not found.'
    })
})

//app.com
//app.com/help
//app.com/help/about

app.listen(port, () => {
    console.log('Server is up on the port' + port)   //starting of a server is asynchronous process
})  //this start the server and on specific port (development port) http= 80port


