const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '9bea1d29',
			s      : searchTerm
			// i      : 'tt0848228'
		}
	});
	console.log(response.data);
};


const onInput = event => {
	// This is event for EventListener
	//Tutaj jest ten event, ktory jest uruchamiany w momencie wykrycia przez EventListener
	fetchData(event.target.value);
};

const input = document.querySelector('input'); //Selecting the input
input.addEventListener('input', debounce(onInput, 1000)); // Add event listener that listens for inputs