var validUrl = require('valid-url');

function handleSubmit(event) {
    event.preventDefault();
    const userInput = document.getElementById('name').value;
    checkURL(userInput);
};

// Found this to check for a valid URL --> https://www.npmjs.com/package/valid-url
function checkURL(userInput) {
    if (validUrl.isUri(userInput)) {
        document.getElementById('noErrorMessage').innerHTML = "Looks like a URL";
    }
    // Conduct aylien API text analysis
    else {
        console.log("checkURL (1): not a url", userInput);
        console.log("checkURL (2): sending input to backend for analysis");
        postData("http://localhost:8080/analysis", { "userResponse": userInput });
    }
};

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const aylienResponse = await response.json();
        document.getElementById('results').innerHTML = aylienResponse.input;
        document.getElementById('subjectivity_confidence').innerHTML = aylienResponse.subjectivityConfidence;
        document.getElementById('polarity').innerHTML = aylienResponse.userPolarity;
        document.getElementById('subjectivity').innerHTML = aylienResponse.userSubjectivity;
        return aylienResponse;
    } catch (error) {
        console.log('error', error);
    };
};


export {
    handleSubmit,
    checkURL
} 
