import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import { Select, FormControl, MenuItem } from "@material-ui/core";
import countriesData from "../data/countries.json";
import newsCategoriesData from "../data/newsCategories.json";
import { useDataLayerValue } from "../DataLayer";
import { AiOutlineSearch } from "react-icons/ai";

function Header() {
	const [newsType, setNewsType] = useState('globalNews');
	const [newsCategory, setNewsCategory] = useState('top-headlines');
	const [newsCategories, setNewsCategories] = useState([]);
	const [countries, setCountries] = useState([])
	const [state, dispatch] = useDataLayerValue();
	const [search, setSearch] = useState('');

	useEffect(() => {
		setCountries(countriesData);
		setNewsCategories(newsCategoriesData);
	}, [])

	const changeNewsType = (e) => {
		setNewsType(e.target.value);
		dispatch({
			type: 'SET_NEWS_TYPE',
			newsType: e.target.value
		})
	}

	const handleSearch = (e) => {
		e.preventDefault();
		dispatch({
			type: 'SET_SEARCH',
			search: search.split(' ').join('+') 
		})
	}

	const changeNewsCategory = (e) => {
		setNewsCategory(e.target.value);
		dispatch({
			type: 'SET_NEWS_CATEGORY',
			newsCategory: e.target.value
		})
	}

	return (
		<div className="header">
			<div className="header__top">
				<h1> News App </h1>
				<form className="header__search">
					<input 
						type="text"
						placeholder="Search News"
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
					<button type="submit" onClick={handleSearch}> <AiOutlineSearch /> </button>
				</form>
				<div>
					<FormControl>
						<Select
							variant="outlined"
							value={newsCategory}
							onChange={changeNewsCategory}
						>
							<MenuItem value="top-headlines"> Headlines </MenuItem>
							{
								newsCategories.map((category) => (
									<MenuItem value={category.categoryCode}> { category.categoryName } </MenuItem>
								))
							}
						</Select>
					</FormControl>
					<FormControl>
						<Select
							variant="outlined"
							value={newsType}
							onChange={changeNewsType}
						>
							<MenuItem value="globalNews"> Global news </MenuItem>
							{
								countries.map(country => (
									<MenuItem value={country.countryCode}> { country.countryName } </MenuItem>
								))
							}
						</Select>
					</FormControl>
				</div>
			</div>

			<div className="header__info">
				<div> </div>
				<h1> { newsCategory } </h1>

				<div> </div>
			</div>
		</div>
	)
}

export default Header;