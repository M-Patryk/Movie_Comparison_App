const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '9bea1d29',
			s      : searchTerm
			// i      : 'tt0848228'
		}
	});

	if (response.data.Error) {
		return [];
	}
	return response.data.Search;
};

const root = document.querySelector('.autocomplete'); //Metoda dodajaca HTML kod do autocomplete
root.innerHTML = `
	<label><b>Search for a Movie</b></label>
	<input class='input' />
	<div class = 'dropdown'>
		<div class = 'dropdown-menu'>
			<div class = 'dropdown-content results'></div>
		</div>
	</div>
`;

const input = document.querySelector('input'); //Selecting the input

const dropdown = document.querySelector('.dropdown'); //To jest od autocomplete
const resultsWrapper = document.querySelector('.results'); //To jest od autocomplete

const onInput = async (event) => {
	// This is event for EventListener
	//Tutaj jest ten event, ktory jest uruchamiany w momencie wykrycia przez EventListener
	const movies = await fetchData(event.target.value);

	if (!movies.length) {
		// Algo to hide dropdown if something was removed from it and its empty
		dropdown.classList.remove('is-active');
		return;
	}

	resultsWrapper.innerHTML = ''; // To clearuje liste filmow z autocomplete
	dropdown.classList.add('is-active');
	for (let movie of movies) {
		const option = document.createElement('a');

		const checkForImgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		option.classList.add('dropdown-item');
		option.innerHTML = `
			<img src="${checkForImgSrc}" />
			${movie.Title}
		`;

		option.addEventListener('click', () => {
			dropdown.classList.remove('is-active');
			input.value = movie.Title;
			onMovieSelect(movie);
		});

		resultsWrapper.appendChild(option);
	}
};

input.addEventListener('input', debounce(onInput, 500)); // Add event listener that listens for inputs

document.addEventListener('click', (event) => {
	if (!root.contains(event.target)) {
		dropdown.classList.remove('is-active');
	}
});

const onMovieSelect = async (movie) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '9bea1d29',
			i      : movie.imdbID
		}
	});

	document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetails) => {
	return `
	<article class = "media">
		<figure class = "media-left">
			<p class = "image">
				<img src = "${movieDetails.Poster}"
			</p>
		</figure>
		<div class = "media-content> 
			<div class = "content">
				<h1>${movieDetails.Title}</h1>
				<h4>${movieDetails.Genre}</h4>
				<p>${movieDetails.Plot}</p>
			 </div>
		</div>
	`;
};
