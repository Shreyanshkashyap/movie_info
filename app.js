// click event
document.getElementById('get-result').addEventListener('click',getInfo);

function getInfo(e) {
    const movie = document.getElementById('movie').value;
    const year = document.getElementById('year').value;
    
    // if entry feild is empty
    if(movie === ''||year === '') {

        // set input blank
        setInput();

        const alert = document.createElement('p');
        alert.className = 'text-danger  alert';
        alert.style.padding = '0.5rem 0rem';
        alert.textContent = 'Please fill the entry feilds';

        const container = document.querySelector('.container');
        const form = document.getElementById('input-form');
        container.insertBefore(alert,form);

        // set timeout
        setTimeout(function() {
            const alert = document.querySelector('.alert');
            alert.remove();
        },2000);
    }
    else {
        const xhr = new XMLHttpRequest();

        xhr.open('GET',`https://www.omdbapi.com/?apikey=47abc91b&t=${movie}&y=${year}`,true);

        xhr.onload = function() {
            if(this.status === 200) {
                const response = JSON.parse(this.responseText);
                const info = document.getElementById('info');
                console.log(response);

                if(response.Response === 'True') {

                    let output = document.getElementById('output');

                    output.innerHTML = `
                    <li><h2>Movie Name & YOR</h2><p>${response.Title} , ${response.Released} (${response.Rated})</p></li>
                    <li><h3>Genre</h3><p>${response.Genre}</p></li>
                    <li><h3>Director</h3><p>${response.Director}</p></li>
                    <li><h3>Actors</h3><p>${response.Actors}</p></li>
                    <li><h3>IMDB Rating</h3><p>${response.imdbRating} (${response.imdbVotes} Votes)</p></li>
                    <li><h3>Awards</h3><p>${response.Awards}</p></li>
                    <li><h3>Plot</h3><p>${response.Plot}</p></li>
                    `;


                } else {
                    errorMessage('Sorry, Result Not Found!');
                }

            } else {
                errorMessage('Connection failed :(');
            }

        }

        xhr.send();
    }

    e.preventDefault();
}

function setInput() {
    document.getElementById('movie').value = '';
    document.getElementById('year').value = '';
}

function errorMessage(message) {
    let output = document.getElementById('output');

    // set input blank
    setInput();

    output.innerHTML = `<li class="text-danger text-center" id="error" style="list-style: none;"><h2>${message}</h2></li>`;
    
    // remove after 2 secs
    setTimeout(function() {
        const error = document.getElementById('error');
        error.remove();
    },2000);
}