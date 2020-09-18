//dynamic page 

//const { response } = require("express")

console.log("client side javascript msg is printed")  //client side javascript which will gonna run into browser

//handle bar -to render dynamic documents as opose to static one

//handle bar is a low level library (templating tool) that implement handle bars in javascript. we are using handle bars with express server

//to fetch the forecast
 
//http request from client side javascript  (fetch API ) fetch is not part of javascript it is browser based API
//but it will not gonna use in node js not applicable in node js
//how to get data in client side javascript
/*fetch('http://puzzle.mead.io/puzzle').then((response) =>{
     response.json().then((data)=>{
         console.log(data)
     })
})*/

//asynchronous output
fetch('http://localhost:3000/weather?address=!').then((response)=>{
    response.json().then((data)=>{
        if(data.error)
    {
        console.log(data.error)
    } else{
       console.log(data.location)
       console.log(data.forecast)
    }
        
     })

})

const weatherForm = document.querySelector('form')
const search =document.querySelector('input')
const messageOne =document.querySelector('#message-1')
const messageTwo =document.querySelector('#message-2')
//messageOne.textContent = 'from Javscript'



//event listener

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = search.value
   messageOne.textContent= 'Loading....'
   messageTwo.textContent= ''
    //console.log(location)
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{   //migrate fetch call into the submit callback
    response.json().then((data)=>{
        if(data.error)
    {
        //console.log(data.error)
        messageOne.textContent=data.error
    } else{
       //console.log(data.location)
       //console.log(data.forecast)
       messageTwo.textContent = data.location
       messageTwo.textContent =data.forecast
    }
        
     })

})

})









































