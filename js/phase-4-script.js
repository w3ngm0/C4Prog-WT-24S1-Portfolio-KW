document.addEventListener('DOMContentLoaded', function() {
    const jokesCheckbox = document.getElementById('jokes');
    const factsCheckbox = document.getElementById('facts');

    // Ensuring only one checkbox is selected at a time
    jokesCheckbox.addEventListener('change', function() {
        if (jokesCheckbox.checked) {
            factsCheckbox.checked = false;
        }
    });
    factsCheckbox.addEventListener('change', function() {
        if (factsCheckbox.checked) {
            jokesCheckbox.checked = false;
        }
    });

    document.getElementById('submit-button').addEventListener('click', function() {
        document.getElementById('response-area').innerHTML = '';

        // Get the selected API route
        const jokesChecked = jokesCheckbox.checked;
        const factsChecked = factsCheckbox.checked;
        const apiKey = 'BCyL0uAO76qhQnKJbUy2BfbKqXS1pCtVB7JrXTIj';
        let apiUrl = '';

        // Input validation: Ensure only positive numbers are entered
        const userInput = document.getElementById('content-input').value;
        if (!/^\d+$/.test(userInput) || parseInt(userInput, 10) <= 0) {
            document.getElementById('response-area').innerText = "Please enter a valid positive number";
            return;
        }

        // Determine the API URL based on selected route
        if (jokesChecked) {
            // Use URL without the limit parameter
            apiUrl = 'https://api.api-ninjas.com/v1/jokes';
        } else if (factsChecked) {
            apiUrl = 'https://api.api-ninjas.com/v1/facts';
        } else {
            document.getElementById('response-area').innerText = 'Please select an appropriate API route ... ';
            return;
        }

        document.getElementById('response-area').innerText = "Loading . . . please wait";

        // Fetching facts or jokes
        fetch(apiUrl, {
            headers: {'X-Api-Key': apiKey},
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
                if (Array.isArray(result)) {
                    result.forEach(item => {
                        if (item.joke) {
                            output += `Joke: ${item.joke}\n`;
                        } else if (item.fact) {
                            output += `Fact: ${item.fact}\n`;
                        }
                    });
                } else { // Handling single joke or fact
                    if (result.joke) {
                        output += `Joke: ${result.joke}\n`;
                    } else if (result.fact) {
                        output += `Fact: ${result.fact}\n`;
                    }
                }
                document.getElementById('response-area').innerText = output || 'No results found';
            })
            .catch(error => {
                document.getElementById('response-area').innerText = 'Error: ' + error.message;
            });

    });

    // Clear button implementation
    document.getElementById('clear-button').addEventListener('click', function() {
        document.getElementById('content-input').value = '';
        document.getElementById('response-area').innerHTML = '';
        jokesCheckbox.checked = false;
        factsCheckbox.checked = false;
    });
});
