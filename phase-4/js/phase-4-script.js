document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('submit-button').addEventListener('click', function (){
        document.getElementById('response-area').innerHTML = '';

        // To get the selected API route
        const jokesChecked = document.getElementById('jokes').checked;
        const factsChecked = document.getElementById('facts').checked;
        const apiKey = 'FNJIAlsI046SeeOgdVAoEw==WUQ6BhhzBrHl1TGT';
        let apiUrl = '';

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

    });

});
