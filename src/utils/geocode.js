

const request =require('request')
const chalk= require('chalk')
const geocode =(address,callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+ '.json?access_token=pk.eyJ1IjoidmFpZGVoaXphZGUiLCJhIjoiY2tjaG54dGwwMDZqeTJycDVuaXNtMWVnMSJ9.NXmo8A1pUfODdRPW95FsKg&limit=1'
    
    request({ url,json: true},(error, {body}) =>{
        if(error)
        {
            callback(chalk.bgRedBright.inverse('Unable to connect to location service!',undefined))
        } else if(body.features.length=== 0)
        {
            callback(chalk.magentaBright.inverse('Unable to find location try another search!',undefined))
        }
        else{
             callback(undefined, {
                 latitude: body.features[0].center[1],
                 longitude: body.features[0].center[0],
                 location: body.features[0].place_name
             })
        }
    })
}
module.exports = geocode



