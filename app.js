const autoCompleteConfig = {
	renderOption(movie) {
		const checkForImgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
		<img src="${checkForImgSrc}" />
		${movie.Title} (${movie.Year})
		`;
	},
	inputValue(movie) {
		return movie.Title;
	},
	async fetchData(searchTerm) {
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
	}
};

createAutoComplete({
	...autoCompleteConfig,
	root           : document.querySelector('.left-autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
	}
});
createAutoComplete({
	...autoCompleteConfig,
	root           : document.querySelector('.right-autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
	}
});

let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryElement, side) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '9bea1d29',
			i      : movie.imdbID
		}
	});

	summaryElement.innerHTML = movieTemplate(response.data);
	if (side === 'left') {
		leftMovie = response.data;
	} else {
		rightMovie = response.data;
	}
	if (leftMovie && rightMovie) {
		runComparison();
	}
};

const runComparison = () => {
	const leftSideStats = document.querySelectorAll('#left-summary .notification');
	const rightSideStats = document.querySelectorAll('#right-summary .notification');

	leftSideStats.forEach((leftStat, index) => {
		const rightStat = rightSideStats[index];

		const leftSideValues = parseInt(leftStat.dataset.value);
		const rightSideValues = parseInt(rightStat.dataset.value);

		if (rightSideValues > leftSideValues) {
			leftStat.classList.remove('is-primary');
			leftStat.classList.add('is-warning');
		} else {
			rightStat.classList.remove('is-primary');
			rightStat.classList.add('is-warning');
		}
	});
};

const movieTemplate = (movieDetails) => {
	const metaScore = parseInt(movieDetails.Metascore);
	const imdbRating = parseFloat(movieDetails.imdbRating);
	const imdbVotes = parseInt(movieDetails.imdbVotes.replace(/,/g, ''));
	const awards = movieDetails.Awards.split(' ').reduce((prev, word) => {
		const value = parseInt(word);
		if (isNaN(value)) {
			return prev;
		} else {
			return prev + value;
		}
	}, 0);

	return `
	<article class = "media">
		<figure class = "media-left">
			<p class = "image">
				<img src = "${movieDetails.Poster}" />
			</p>
		</figure>
		<div class = "media-content> 
			<div class = "content">
				<h1>${movieDetails.Title}</h1>
				<h4>${movieDetails.Genre}</h4>
				<p>${movieDetails.Plot}</p>
			 </div>
		</div>
	</article>
	<article data-value = ${awards} class = "notification is-primary">
		<p class = "title">${movieDetails.Awards}</p>
		<p class = "subtitle">Awards</p>
	</article>
	<article data-value = ${metaScore} class = "notification is-primary">
		<p class = "title">${movieDetails.Metascore}</p>
		<p class = "subtitle">Metascore</p>
	</article>
	<article data-value = ${imdbRating} class = "notification is-primary">
		<p class = "title">${movieDetails.imdbRating}</p>
		<p class = "subtitle">IMDB Rating</p>
	</article>
	<article data-value = ${imdbVotes} class = "notification is-primary">
		<p class = "title">${movieDetails.imdbVotes}</p>
		<p class = "subtitle">IMDB Votes</p>
	</article>
	`;
};
