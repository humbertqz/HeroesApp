import React from 'react';
import queryString from 'query-string';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { useMemo } from 'react';

export const SearchScreen = ({ history }) => {
	const location = useLocation();
	const { q = '' } = queryString.parse(location.search);

	const [formValues, handleInputChange] = useForm({ searchTerm: q });

	const { searchTerm } = formValues;

	const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);
	// const heroesFiltered = getHeroesByName(searchTerm);

	const handleSearch = (e) => {
		e.preventDefault();

		history.push(`?q=${searchTerm}`);
	};

	return (
		<div>
			<h1>Search Screen</h1>
			<hr />
			<div className='row'>
				<div className='col-5'>
					<h4>Search form</h4>
					<hr />
					<form onSubmit={handleSearch}>
						<div className='form-group'>
							<input
								type='text'
								className='form-control'
								name='searchTerm'
								value={searchTerm}
								onChange={handleInputChange}
								autoComplete='off'
							/>
						</div>
						<button
							className='btn btn-primary btn-block'
							type='submit'
						>
							Search
						</button>
					</form>
				</div>
				<div className='col-7'>
					<h4>Results</h4>
					<hr />
					{q === '' && (
						<div className='alert alert-info'>
							Search for a hero
						</div>
					)}
					{q !== '' && heroesFiltered.length === 0 && (
						<div className='alert alert-danger'>
							There no hero with {q}
						</div>
					)}
					{heroesFiltered.map((hero) => (
						<HeroCard key={hero.id} {...hero} />
					))}
				</div>
			</div>
		</div>
	);
};
