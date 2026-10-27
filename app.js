document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const word = document.getElementById('searchInput').value;
    fetchWordData(word);
});

function fetchWordData(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Word not found');
            }
            return response.json();
        })
        .then(data => displayResults(data))
        .catch(error => handleError(error));
}

function displayResults(data) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results
    data.forEach(entry => {
        const definitions = entry.meanings.map(meaning => meaning.definitions[0].definition).join(', ');
        const synonyms = entry.meanings.flatMap(meaning => meaning.synonyms).join(', ');
        const pronunciation = entry.phonetics[0].audio;

        resultsContainer.innerHTML += `
            <div class="result">
                <h3>${entry.word}</h3>
                <p><strong>Definitions:</strong> ${definitions}</p>
                <p><strong>Synonyms:</strong> ${synonyms}</p>
                <audio controls>
                    <source src="${pronunciation}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
        `;
    });
}

function handleError(error) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
}
