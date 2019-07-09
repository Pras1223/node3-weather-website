const request = require("request");




const forecast=(lat , long ,callback)=>{
    const url ="https://api.darksky.net/forecast/d9f17200c80fec384cca21b10274e04c/"+encodeURIComponent(lat)+','+encodeURIComponent(long)+'';
    request({  url , json: true},(error,{body})=>
    {
        if(error)
        {
            callback("Unable to connect to network");
        }
        else if(body.error)
        {
            callback("Invalid cooridinates")
        }
        else
        {
            callback(undefined,"Temperature "+body.currently.temperature+"precipitation "+body.currently.precipProbability )
        }
      
    }
);



}

module.exports = forecast ;
