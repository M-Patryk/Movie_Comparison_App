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
	root : document.querySelector('.left-autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#left-summary'));
	}
});
createAutoComplete({
	...autoCompleteConfig,
	root : document.querySelector('.right-autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-summary'));
	}
});

const onMovieSelect = async (movie, summaryElement) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '9bea1d29',
			i      : movie.imdbID
		}
	});

	summaryElement.innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetails) => {
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
	<article class = "notification is-primary">
		<p class = "title">${movieDetails.Awards}</p>
		<p class = "subtitle">Awards</p>
	</article>
	<article class = "notification is-primary">
		<p class = "title">${movieDetails.Metascore}</p>
		<p class = "subtitle">Metascore</p>
	</article>
	<article class = "notification is-primary">
		<p class = "title">${movieDetails.imdbRating}</p>
		<p class = "subtitle">IMDB Rating</p>
	</article>
	<article class = "notification is-primary">
		<p class = "title">${movieDetails.imdbVotes}</p>
		<p class = "subtitle">IMDB Votes</p>
	</article>
	`;
};
