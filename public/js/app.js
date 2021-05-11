
// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherapp = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#msg-one')
const messagetwo = document.querySelector('#msg-two')


messagetwo.textContent ='From javascript'

weatherapp.addEventListener('submit',(e)=>{
    e.preventDefault()

    
messagetwo.textContent ='Loading...'
messageone.textContent =''

    const location = search.value
    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messagetwo.textContent = data.error
            console.log(data.error)
        } else {
            messageone.textContent = data.location

            messagetwo.textContent = data.forecast
            
            
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
    
})
