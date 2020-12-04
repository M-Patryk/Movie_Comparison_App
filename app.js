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

	resultsWrapper.innerHTML = ''; // To clearuje liste filmow z autocomplete
	dropdown.classList.add('is-active');
	for (movie of movies) {
		const autoCompleteOption = document.createElement('a');

		const checkForImgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		autoCompleteOption.classList.add('dropdown-item');
		autoCompleteOption.innerHTML = `
		<img src="${checkForImgSrc}" />
		${movie.Title}
		`;

		resultsWrapper.appendChild(autoCompleteOption);
	}
};

input.addEventListener('input', debounce(onInput, 500)); // Add event listener that listens for inputs
