const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '9bea1d29',
			s      : searchTerm,
			// i      : 'tt0848228'
		}
	});
	console.log(response.data);
};

let timeoutId;	// Declared for timeout
const onInput = (event) => { // This is event for EventListener
	if(timeoutId){	
		clearTimeout(timeoutId)		//Funkcja resetujaca timer w przypadku kiedy cos wpisujemy
	}
	timeoutId = setTimeout(() => {	//Tutaj jest ten event, ktory jest uruchamiany w momencie wykrycia
		fetchData(event.target.value)	//  przez EventListener
	}, 1000);
}
const input = document.querySelector('input')	//Selecting the input
input.addEventListener('input', onInput)	// Add event listener that listens for inputs