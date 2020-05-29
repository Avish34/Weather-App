const request=require('request')

const gc=(address,callback)=>{
    var url2='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXZpc2gzNCIsImEiOiJja2FtZmJ4ajIxM3BwMnp0ZHFiMmc0N2ozIn0.PI5Nt3M6lGGvocnvxELaGQ'

    request({url: url2, json: true},(error,response)=>{
        if(error)
            callback('invalid location',undefined)
        else if(response.body.features.length===0)
            console.log('Unable to find the location, Please check again',undefined)
        else{
            callback(undefined,{
             longitude :response.body.features[0].center[0],
             latitude: response.body.features[0].center[1],
             city: response.body.features[0].place_name
            })    
            //console.log(latitude, longitude)
        }    
       
    })
}
module.exports=gc



