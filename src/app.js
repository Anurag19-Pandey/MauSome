const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine','hbs');

const template_path = path.join(__dirname,'../templates/views');
const partials_path = path.join(__dirname,'../templates/partials');

app.set('views',template_path);
hbs.registerPartials(partials_path);
//for static website
const Filepath = path.join(__dirname,'../public')
app.use(express.static(Filepath));

//routing
app.get("",(req,res)=>{
   res.render('index');
})

app.get("/about",(req,res)=>{
    res.render('about');
 })

 app.get("/weather",(req,res)=>{
    res.render('weather');
 })

 app.get("*",(req,res)=>{
    res.render('404error',{
      errorMsg: 'Oops! Page Not Found'
    });
 })

app.listen(port,()=>{
    console.log(`Connecting to the port at ${port}`);
})