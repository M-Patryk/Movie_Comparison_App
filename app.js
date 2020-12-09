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


const onMovieSelect = async (movie) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '9bea1d29',
			i      : movie.imdbID
		}
	});

	document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

createAutoComplete({
	root: document.querySelector('.autocomplete'),
	renderOption(movie){
		const checkForImgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
		<img src="${checkForImgSrc}" />
		${movie.Title} (${movie.Year})
		`
	},
	onOptionSelect(movie){
		onMovieSelect(movie)
	},
	inputValue(movie){
		return movie.Title
	}
})


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
