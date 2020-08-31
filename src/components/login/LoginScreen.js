import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {
	const { dispatch } = useContext(AuthContext);

	const handleLogin = () => {
		const lastPath = localStorage.getItem('lastPath') || '/';

		dispatch({
			type: types.login,
			payload: {
				name: 'Paticho',
			},
		});
		history.replace(lastPath);
	};

	return (
		<div className='p-5'>
			<h1>LoginScreen</h1>
			<hr />
			<button className='btn btn-primary' onClick={handleLogin}>
				Login
			</button>
		</div>
	);
};
