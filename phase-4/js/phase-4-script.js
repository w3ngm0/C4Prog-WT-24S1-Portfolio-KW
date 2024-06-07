document.addEventListener('DOMContentLoaded', function(){
    const jokesCheckbox = document.getElementById('jokes');
    const factsCheckbox = document.getElementById('facts');
    //Making sure only one checkbox is selected at a time
    jokesCheckbox.addEventListener('change', function (){
        if (jokesCheckbox.checked) {
            factsCheckbox.checked = false;
        }
    });
    factsCheckbox.addEventListener('change', function (){
        if (factsCheckbox.checked){
            jokesCheckbox.checked = false;
        }
    });

    document.getElementById('submit-button').addEventListener('click', function (){
        document.getElementById('response-area').innerHTML = '';

        // To get the selected API route
        const jokesChecked = jokesCheckbox.checked;
        const factsChecked = factsCheckbox.checked;
        const apiKey = 'FNJIAlsI046SeeOgdVAoEw==WUQ6BhhzBrHl1TGT';
        let apiUrl = '';


        // Input validation: Ensure only numbers are entered
        const userInput = document.getElementById('content-input').value;
        if(!/^\d+$/.test(userInput)){
            document.getElementById('response-area').innerText = "Please enter a valid number";
            return;
        }
        // Setting limit for number of Jokes being returned -> cannot retrieve for facts API only calls one fact at a time
        const limit = userInput;

        // Adding selected  API routes - Handling user error or input errors
        if (jokesChecked){
            apiUrl = `https://api.api-ninjas.com/v1/jokes?limit=${limit}`;
        } else if (factsChecked) {
            apiUrl = 'https://api.api-ninjas.com/v1/facts';
        } else {
            document.getElementById('response-area').innerText = 'Please select an appropriate API route ... ';
            return;
        }


        document.getElementById('response-area').innerText = "Loading . . . please wait";


        //Fetching facts or jokes
        fetch(apiUrl, {
            headers: {'X-Api-key': apiKey},
            method: 'GET'
        })
            .then(response => {
                if (!response.ok)  {
                    throw new Error(`API error: ${response.statusText}`);
                }
                return response.json();
            })
            .then(result => {
                let output = '';
                result.forEach(item => {
                    if (item.fact) {
                        output += `Fact: ${item.fact}\n`;
                    } else if (item.joke) {
                        output += `Joke: ${item.joke}\n`;
                    }
                });
                document.getElementById('response-area').innerText = output;
            })
            .catch(error => {
            document.getElementById('response-area').innerText = 'Error: ' + error.message;
            });

        });
        //Clear button implementation
        document.getElementById('clear-button').addEventListener('click', function(){
            document.getElementById('content-input').value= '';
            document.getElementById('response-area').innerHTML= '';
            document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
            jokesCheckbox.checked = false;
            factsCheckbox.checked = false;
        });

});
