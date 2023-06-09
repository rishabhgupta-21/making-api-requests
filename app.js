// https://uselessfacts.jsph.pl/api/v2/facts/today

const factsList = document.querySelector('#factsList')
const fetchCallbackButton = document.querySelector('#fetchCallback')
const fetchAsyncButton = document.querySelector('#fetchAsync')
const axiosCallbackButton = document.querySelector('#axiosCallback')
const axiosAsyncButton = document.querySelector('#axiosAsync')

// Configuration Information
const config = {
    headers: {
        Accept: 'application/json'
    }
}

// Function for Dealing with Errors
function addErrorFact(err) {
    console.error(err);

    const p = document.createElement('p')
    p.innerText = 'Sorry, no new facts are available right now :('
    p.classList.add('error')
    factsList.append(p)
}

// Event Listeners for all 4 buttons
fetchCallbackButton.addEventListener('click', () => {
    fetch('https://uselessfacts.jsph.pl/api/v2/facts/random', config)
        .then(response => {
            return response.json()
        })
        .then(data => {
            const newFact = document.createElement('li')
            newFact.append(data.text)
            newFact.classList.add('fact')
            factsList.append(newFact)
        })
        .catch(err => {
            addErrorFact(err)
        })
})

fetchAsyncButton.addEventListener('click', async () => {
    try {
        const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random', config)
        const data = await response.json();

        const newFact = document.createElement('li');
        newFact.append(data.text)
        newFact.classList.add('fact')
        factsList.append(newFact)
    }
    catch (err) {
        addErrorFact(err)
    }
})

axiosCallbackButton.addEventListener('click', () => {
    axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random', config)
        .then(response => {
            const newFact = document.createElement('li')
            newFact.append(response.data.text)
            newFact.classList.add('fact')
            factsList.append(newFact)
        })
        .catch(err => {
            addErrorFact(err)
        })
})

axiosAsyncButton.addEventListener('click', async () => {
    try {
        const response = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random', config)

        const newFact = document.createElement('li')
        newFact.append(response.data.text)
        newFact.classList.add('fact')
        factsList.append(newFact)
    }
    catch (err) {
        addErrorFact(err)
    }
})