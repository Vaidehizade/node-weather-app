const request =require('request') //npm library

const forecast = (latitude,longitude,callback) =>{
    const url= 'https://api.darksky.net/forecast/fc2c3eb2d4eac475ff0a1dc66f9a6f89/' + latitude + ',' + longitude
    request({url, json: true},(error,{body})  =>  {
   if(error)
   {
    callback('Unable to connect to weather service!',undefined)
   }else if (body.error){
    callback('unable to find the location',undefined)
   }
   else{
    callback(undefined, body.daily.data[0].summary +' It is currently '+ body.currently.temperature+ ' Fahrenheite out. There is '+body.currently.precipProbability+'% chance of rain.')
}
    })
    
}
module.exports =forecast

