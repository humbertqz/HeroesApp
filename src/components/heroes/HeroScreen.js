import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { getHeroeById } from '../../selectors/getHeroById';
import { useMemo } from 'react';

export const HeroScreen = ({ history }) => {
	const { heroeId } = useParams();

	const hero = useMemo(() => getHeroeById(heroeId), [heroeId]);
	// const hero = getHeroeById(heroeId);

	if (!hero) {
		return <Redirect to='/' />;
	}

	const handleReturn = (e) => {
		e.preventDefault();
		if (history.length <= 2) {
			history.push('/');
		}
		history.goBack();
	};

	const {
		superhero,
		publisher,
		alter_ego,
		first_appearance,
		characters,
	} = hero;

	return (
		<div>
			<div className='row mt-5'>
				<div className='col-4'>
					<img
						src={`../assets/heroes/${heroeId}.jpg`}
						alt={superhero}
						className='img-thumbnail img-fluid animate__animated animate__fadeInUp'
					/>
				</div>
				<div className='col-8 animate__animated animate__fadeInUp'>
					<h3>{superhero}</h3>
					<ul className='list-group list-group-flush'>
						<li className='list-group-item'>
							<b>Alter ego:</b> {alter_ego}
						</li>
						<li className='list-group-item'>
							<b>Publisher:</b> {publisher}
						</li>
						<li className='list-group-item'>
							<b>First appearance:</b> {first_appearance}
						</li>
					</ul>

					<h5>Characters</h5>
					<p>{characters}</p>

					<button
						className='btn btn-outline-info'
						onClick={handleReturn}
					>
						Return
					</button>
				</div>
			</div>
		</div>
	);
};
