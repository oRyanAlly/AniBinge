import React, { useState, useEffect } from 'react';
import Anime from './components/Anime';
import styled from 'styled-components';
import './Results.css';
import TextTruncate from 'react-text-truncate';

const ResultContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, 225px);
	grid-template-rows: repeat(auto, 225px);
	grid-gap: 1rem;
	max-width: 1200px;
	margin: 0 auto;
	animation: 1s ease-out 0s 1 slideInFromTop;
	@media (min-width: 375px) and(max-width: 999px) {
		h1 {
			position: fixed;
			left: 25%;
			top: 25%;
			transform: translate(50%, -50%);
		}
	}
	@media (min-width: 350px) {
		grid-template-columns: repeat(1, 225px);
		justify-content: center;
	}
	@media (min-width: 600px) {
		grid-template-columns: repeat(2, 225px);
		justify-content: center;
	}
	@media (min-width: 900px) {
		grid-template-columns: repeat(3, 225px);
		justify-content: center;
	}
	@media (min-width: 1000px) {
		grid-template-columns: repeat(auto-fit, 225px);
		justify-content: center;
	}
	@keyframes slideInFromTop {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}
	h1 {
		color: white;
		animation: blink 2s linear infinite;
		margin-top: 100px;
		text-align: center;
	}
	@keyframes blink {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 1;
		}
	}
`;
function Results(props) {
	const [topAnimes, setTopAnimes] = useState([]);
	const [animes, setAnimes] = useState([]);
	const [animeList, setAnimeList] = useState([]);
	var bCheckGenre = false;
	var genreId = null;
	var bDisplayLoading = props.displayLoad;
	const params = {
		method: 'GET',
		mode: 'cors',
		headers: {
			accept: 'application/json',
		},
	};
	const base_url = 'https://api.jikan.moe/v3';

	if (isNaN(props.selectedOption)) {
		bCheckGenre = false;
	} else {
		bCheckGenre = true;
		genreId = parseInt(props.selectedOption);
	}
	useEffect(() => {
		setAnimeList(props.animeResults);
		if (animes !== []) {
			setAnimes([]);
		}
		if (topAnimes !== []) {
			setTopAnimes([]);
		}
	}, [props.animeResults]);

	const sleep = (milliseconds) => {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	};
	useEffect(() => {
		if (bCheckGenre === false) {
			async function fetchTopAnimes() {
				const request = await fetch(
					base_url + props.selectedOption,
					params
				).then((res) => res.json());
				setTopAnimes(request.top.slice(0, 20));
			}
			fetchTopAnimes();
			if (animeList !== []) {
				setAnimeList([]);
			}
		} else {
			async function fetchGenreAnimes() {
				const request = await fetch(
					`https://api.jikan.moe/v3/genre/anime/${genreId}/1`,
					params
				).then((res) => res.json());
				if (request.status !== '429') {
					setAnimes(request.anime.slice(0, 10));
				}
			}
			if (bDisplayLoading) {
				sleep(4000).then(() => {
					fetchGenreAnimes();
					props.setDisplayLoad(false);
				});
			}
			if (animeList !== []) {
				setAnimeList([]);
			}
		}
	}, [props.selectedOption]);

	const fetchAnime = async (query) => {
		const temp = await fetch(base_url + '/anime/' + query, params).then((res) =>
			res.json()
		);
		const animeObject = {
			mal_id: temp.mal_id,
			synopsis: temp.synopsis,
			premiered: temp.premiered,
			type: temp.type,
			status: temp.status,
			episodes: temp.episodes,
			rating: temp.rating,
			score: temp.score,
			aired: temp.aired.string,
		};
		return animeObject;
	};
	const [aniObject, setAniObject] = useState([]);
	const [title, setTitle] = useState([]);
	const [image_url, setImageUrl] = useState([]);
	const [url, setUrl] = useState([]);

	async function displayInfo(anime_title, image_url, url, aniInfo) {
		aniInfo.then((result) => {
			setAniObject(result);
			setTitle(anime_title);
			setImageUrl(image_url);
			setUrl(url);
		});
	}
	const [displayObject, setDisplayObject] = useState(false);
	return (
		<ResultContainer>
			<div id="CenterDIV" style={{ display: displayObject ? 'block' : 'none' }}>
				<div class="divFloat">
					<input
						type="button"
						id="btClose"
						class="btClose"
						value="X"
						onClick={() => setDisplayObject(false)}
					/>
					<h2>{title}</h2>
					<img src={image_url} alt="" />

					<TextTruncate
						className="textTrun"
						line={6}
						element="p"
						truncateText="..."
						textTruncateChild={<a href={url}>Read More</a>}
						text={aniObject.synopsis}
					></TextTruncate>
					<div className="stats">
						<p>Type: {aniObject.type}</p>
						<p>Episodes: {aniObject.episodes}</p>
						<p>Status: {aniObject.status}</p>
						<p>Aired: {aniObject.aired}</p>
						<p>Premiered: {aniObject.premiered}</p>
						<p>Score: {aniObject.score} / 10</p>
					</div>
				</div>
			</div>
			{animeList !== []
				? animeList.map((anime) => (
						<div
							onClick={() => {
								displayInfo(
									anime.title,
									anime.image_url,
									anime.url,
									fetchAnime(anime.mal_id)
								);
								setDisplayObject(true);
							}}
						>
							<Anime
								key={anime.mal_id}
								src={anime.image_url}
								title={anime.title}
								url={anime.url}
							/>
						</div>
				  ))
				: false}
			{props.displayLoad && <h1>Loading...</h1>}
			{bCheckGenre && props.displayLoad === false
				? animes.map((anime) => (
						<div
							onClick={() => {
								displayInfo(
									anime.title,
									anime.image_url,
									anime.url,
									fetchAnime(anime.mal_id)
								);
								setDisplayObject(true);
							}}
						>
							<Anime
								key={anime.mal_id}
								src={anime.image_url}
								title={anime.title}
								url={anime.url}
							/>
						</div>
				  ))
				: false}
			{bCheckGenre === false &&
				props.displayLoad === false &&
				topAnimes.map((anime) => (
					<div
						onClick={() => {
							displayInfo(
								anime.title,
								anime.image_url,
								anime.url,
								fetchAnime(anime.mal_id)
							);
							setDisplayObject(true);
						}}
					>
						<Anime
							key={anime.mal_id}
							src={anime.image_url}
							title={anime.title}
							url={anime.url}
						/>
					</div>
				))}
		</ResultContainer>
	);
}

export default Results;
