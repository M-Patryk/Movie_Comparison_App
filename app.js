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

//	!!! DEBOUNCE OGRANICZA JAK CZESTO onInput JEST WYKONYWANE !!!
// (func) w tym przypadku to jest z onInput event, a dokladnie ten kawalek ((event) => {fetchData(event.target.value);});
const debounce = (func, delay = 1000) => {
	let timeoutId; //It has to be declared to later use it to declare timeout as this var
	return (...args) => {
		if (timeoutId) {
			//Tutaj standardowo - jesli cos napisze i odpali sie timer to ta funkcja
			clearTimeout(timeoutId); //go zresetuje
		}
		timeoutId = setTimeout(() => {
			//deklaracja timera
			func.apply(null, args);
			//Zasada dzialania "func.apply". Dziala tak jakbym napisal func(arg1, arg2, arg3)
			//Tyle, ze zamiast podawac wszystkie argumenty po kolei to uzywamy apply i samo podaje wszystkie
			//Wywolaj funkcje, wez wszystkie argumenty i osobno podawaj je jako arugmenty do oryginalnej funkcji
		}, delay);
	};
};

const onInput = event => {
	// This is event for EventListener
	//Tutaj jest ten event, ktory jest uruchamiany w momencie wykrycia przez EventListener
	fetchData(event.target.value);
};

const input = document.querySelector('input'); //Selecting the input
input.addEventListener('input', debounce(onInput, 1000)); // Add event listener that listens for inputs