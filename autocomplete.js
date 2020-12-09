const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
	root.innerHTML = `
	<label><b>Search</b></label>
	<input class='input' />
	<div class = 'dropdown'>
		<div class = 'dropdown-menu'>
			<div class = 'dropdown-content results'></div>
		</div>
	</div>
`;

	const input = root.querySelector('input'); //Selecting the input
	const dropdown = root.querySelector('.dropdown'); //To jest od autocomplete
	const resultsWrapper = root.querySelector('.results'); //To jest od autocomplete

	const onInput = async (event) => {
		// This is event for EventListener
		//Tutaj jest ten event, ktory jest uruchamiany w momencie wykrycia przez EventListener
		const items = await fetchData(event.target.value);

		if (!items.length) {
			// Algo to hide dropdown if something was removed from it and its empty
			dropdown.classList.remove('is-active');
			return;
		}

		resultsWrapper.innerHTML = ''; // To clearuje liste filmow z autocomplete
		dropdown.classList.add('is-active');
		for (let item of items) {
			const option = document.createElement('a');

			
			option.classList.add('dropdown-item');
			option.innerHTML = renderOption(item)

			option.addEventListener('click', () => {
				dropdown.classList.remove('is-active');
				input.value = inputValue(item);
				onOptionSelect(item);
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
};
