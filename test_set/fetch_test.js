// var tim_period = document.getElementById('')
// var start_date = document.getElementById('')
// var chat_room = document.getElementById('')
console.log(JSON.stringify({answer : 2}))
async function postData(url='', data={}){
    const response = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    }
        );
        // console.log(response)
        return response.json();
            }

const form = document.getElementById("my_form");
const formOutput = document.querySelector(".form-output");
const val = document.getElementById('form_ans')

form.addEventListener("submit", async function(event) {
    event.preventDefault();
    var request = { answer : val.value}
    const data = await postData('http://EXTERNAL:8000/answer', request);
    const date = document.createTextNode(`결과 ${data.answer}`);
    formOutput.appendChild(date)
});


// postData('http://127.0.0.1:8000/answer', {answer:42})
// .then((data) => {console.log(data.answer)
//     })
// .catch((error) => {
//     console.error(error)
//     // const date = document.createTextNode(`결과 ${{error}}`);
//     // formOutput.appendChild(date)
// })