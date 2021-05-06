import { useState } from 'react';
import './App.css';
import Banner from './Banner';
import requests from './Requests';
import Results from './Results';
import styled from 'styled-components';

const AnimeWrapper = styled.div`
	height: 100% !important;
	width: 90%;
	margin-top: 10px;
	margin-left: auto;
	margin-right: auto;
	padding: 20px;
`;
function App() {
	const [selectedOption, setSelectedOption] = useState(requests.fetchTopAnime);
	const [searchAnime, SetSearch] = useState('');
	const [animeResults, setAnimeSearch] = useState([]);
	const [displayLoad, setDisplayLoad] = useState(false);

	const base_url = 'https://api.jikan.moe/v3';

	async function fetchSearchResult() {
		const request = await fetch(
			base_url + `/search/anime?q=${searchAnime}&sort=asc&limit=10`
		).then((res) => res.json());
		setAnimeSearch(request.results);
	}

	const HandleSearch = (e) => {
		e.preventDefault();

		fetchSearchResult();
	};
	return (
		<div className="app">
			<Banner
				setSelectedOption={setSelectedOption}
				HandleSearch={HandleSearch}
				searchAnime={searchAnime}
				SetSearch={SetSearch}
				displayLoad={displayLoad}
				setDisplayLoad={setDisplayLoad}
			/>
			<AnimeWrapper>
				<Results
					selectedOption={selectedOption}
					animeResults={animeResults}
					displayLoad={displayLoad}
					setDisplayLoad={setDisplayLoad}
				/>
			</AnimeWrapper>
		</div>
	);
}
export default App;
