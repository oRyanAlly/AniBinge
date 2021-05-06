import { React, useState } from 'react';
import './Banner.css';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { MenuItem } from './MenuItem';
import Requests from './Requests';
import MenuIcon from '@material-ui/icons/Menu';

function NavBar(props) {
	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);
	const [genres, setGenresDisplay] = useState(false);
	const handleGenres = () => setGenresDisplay(!genres);
	console.log(genres);

	return (
		<div className="banner">
			<div className="banner__logo">
				<h1>ANIBINGE.</h1>
			</div>
			<div
				className={click ? 'menu__items active' : 'menu__items'}
				id="menu_items"
			>
				<h4
					onClick={() => {
						props.setSelectedOption(Requests.fetchTopAnime);
						closeMobileMenu();
					}}
				>
					TOP ANIME
				</h4>
				<h4
					onClick={() => {
						props.setSelectedOption(Requests.fetchTopAiring);
						closeMobileMenu();
					}}
				>
					TOP AIRING
				</h4>
				<h4
					onClick={() => {
						props.setSelectedOption(Requests.fetchTopUpcoming);
						closeMobileMenu();
					}}
				>
					TOP UPCOMING
				</h4>
				<div className={click ? 'dropdown__genres active' : 'dropdown__genres'}>
					<h4 onClick={handleGenres}>GENRES</h4>
					<ArrowDropDownIcon className="arrowDrop" />
					<div className={genres ? 'genres active' : 'genres'}>
						{MenuItem.map((item) => (
							<a
								key={item.key}
								onClick={() => {
									props.setSelectedOption(`${item.key}`);
									if (props.displayLoad === false) {
										props.setDisplayLoad(true);
									}
									closeMobileMenu();
								}}
							>
								{item.genre}
							</a>
						))}
					</div>
				</div>
				<div
					className={
						click ? 'banner__search_mobile active' : 'banner__search_mobile'
					}
					id="banner_search_mobile"
				>
					<form className="form__search" onSubmit={props.HandleSearch}>
						<input
							type="search"
							placeholder="Search Anime..."
							value={props.searchAnime}
							onChange={(e) => props.SetSearch(e.target.value)}
						/>
						<SearchIcon className="searchIcon" />
					</form>
				</div>
			</div>
			<div className="banner__search" id="banner_search">
				<form className="form__search" onSubmit={props.HandleSearch}>
					<input
						type="search"
						placeholder="Search Anime..."
						value={props.searchAnime}
						onChange={(e) => props.SetSearch(e.target.value)}
					/>
					<SearchIcon className="searchIcon" />
				</form>
			</div>
			<div className="menu__Icon" onClick={handleClick}>
				<MenuIcon className="menuIcon" fontSize="large" />
			</div>
		</div>
	);
}
export default NavBar;
