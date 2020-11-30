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

const onInput = async (event) => {
	// This is event for EventListener
	//Tutaj jest ten event, ktory jest uruchamiany w momencie wykrycia przez EventListener
	const movies = await fetchData(event.target.value);

	for (movie of movies) {
		const div = document.createElement('div');

		div.innerHTML = `
		<img src="${movie.Poster}" />
		<h1>${movie.Title}</h1>
		`;

		document.querySelector('#target').appendChild(div);
	}
};

const input = document.querySelector('input'); //Selecting the input
input.addEventListener('input', debounce(onInput, 500)); // Add event listener that listens for inputs
