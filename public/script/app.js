

const weatherForm = document.querySelector('form');
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
weatherForm.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const location = search.value;
     messageOne.textContent = "Loading ";
     messageOne.textContent = ' ';
    fetch('http://127.0.0.1:3000/weather?address='+location).then((response)=>
{
    response.json().then((data)=>
    {
        if(data.err)
        {
             console.log(data.err);
             messageOne.textContent = data.err;
        }
        else{
             console.log(data.forecast);
             console.log(data.address);
            messageOne.textContent = data.forecast + data.address ;
        }
    } )
})

})