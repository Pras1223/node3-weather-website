const path = require("path");
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js")
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partial = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirPath));

app.set('view engine','hbs');
app.set('views',viewPath);//serving template folder by default it takes views
hbs.registerPartials(partial);

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather' , name : 'Prashanta'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me' , name : 'Prashanta'
    });
});

 app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help' , name : 'Prashanta'
    });
 });

// app.get('/about',(req,res)=>{
//     res.send("<h3>About page</h3>");
// });

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({error: 'No address provided'})
    }
    
    geocode(req.query.address,(error,{latitude,longitude}={})=>
    {
        if(error)
        {
           return res.send({ error });
        }
        else
        {
           
            forecast(latitude,longitude,(err,forecastdata)=>{
                if(err)
                {
                    return res.send({ error });
                }
               
                    res.send({
                        forecast : forecastdata,
                        address  : req.query.address      
                    });
                    
            })
        }
       
    } );   
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error : 'help article not found',  name: 'Prashanta',
    });
});

app.get('*',(req,res)=>{
    res.render('404',{
        name: 'Prashanta',
        error : '404 not found'
    });
});
app.listen(port,()=>{
    console.log("SERVER STARTED");
})
