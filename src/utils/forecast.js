const request=require('request')
var forecast=(lat,lon,callback)=>{
    var url='http://api.weatherstack.com/current?access_key=419db7ac96d8f86b94b51812307dd967&query='+lat+','+lon


    request({url: url, json: true},(error,response)=>{
    if(error)
        callback('error',undefined)
    else if(response.body.error)
        callback('Unable to find the location, Please check again',undefined)    
    else{
        callback(undefined,
            {temp: response.body.current.temperature,City: response.body.location.name})
    }
})
}
module.exports=forecast