//import { response } from "express";

//console.log('Client side javascript file is loaded!')

const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const m1=document.querySelector('#i1')
const m2=document.querySelector('#i2')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    console.log(location)
    m1.textContent='Loading...'
    m2.textContent=' '
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            m1.textContent=data.error
        }
        else{
            m1.textContent='Current Temprature : '+data.temperature + ' Degree Celcius'
            m2.textContent='Location : '+data.Location
        }
    })
})
})