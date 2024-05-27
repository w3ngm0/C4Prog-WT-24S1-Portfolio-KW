document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('submit-button').addEventListener('click', function (){
        document.getElementById('response-area').innerHTML = '';

        // To get the selected API route
        const jokesChecked = document.getElementById('jokes').checked;
        const factsChecked = document.getElementById('facts').checked;
        const apiKey = 'FNJIAlsI046SeeOgdVAoEw==WUQ6BhhzBrHl1TGT';
        let apiUrl = '';


        // Adding event listener - Handling user error or input errors
        if (jokesChecked){
            const limit = 3;
            apiUrl = `https://api.api-ninjas.com/v1/jokes?limit=${limit}`;
        } else if (factsChecked) {
            apiUrl = 'https://api.api-ninjas.com/v1/facts';
        } else {
            document.getElementById('response-area').innerText = 'Please select an appropriate API route ... ';
            return;
        }


        document.getElementById('response-area').innerText = "Loading . . . please wait";

        //Fetching facts
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
            });


    });

});
