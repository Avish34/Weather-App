const express=require('express')
const path=require('path')
const request=require('request')
const gc=require('./utils/geocode.js')
const forecast=require('./utils/forecast')
const app=express()
const hbs=require('hbs')
const pathDir=path.join(__dirname, '../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')
const port=process.env.PORT || 3000
app.set('view engine','hbs')
app.set('views',viewpath)
app.use(express.static(pathDir))
hbs.registerPartials(partialpath)
app.use(express.static(pathDir))
app.get('/',(req,res)=>{
    res.render('index',{title: 'Weather', name: 'Avish Porwal'})
})
app.get('/help',(req,res)=>{
    res.render('help',{title: 'Help', name: 'Avish Porwal'})
})
app.get('/about',(req,res)=>{
    res.render('about',{title: 'About', name: 'Avish Porrwal'})
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({error: 'please send address'})
    }
    else{
        gc(req.query.address,(error,data)=>{
            if(error)
                return res.send({error: 'please send  correct address'})
            else    
            { 
               forecast(data.latitude,data.longitude,(error,dat)=>{
           
                if(error)
                   return res.send({error: 'please send  correct address'})
                
                res.send({temperature: dat.temp,latitude: data.latitude, longitude: data.longitude, Location: dat.City, feelslike: dat.High})
                //console.log(dat.temp)   
                }) 
            }  
           
        })
        
    }
})
app.get('/help/*',(req,res)=>{
    res.render('404',{title:'Help Article Not found', name: 'Avish Porwal'})
})
app.get('*',(req,res)=>{
    res.render('404',{title:'404 Page Not found', name: 'Avish Porwal'})
})

app.listen(port,()=>{
    console.log('Server Stared !')
})