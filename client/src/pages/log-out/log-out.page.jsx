import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './log-out.styles.scss';

import config from '../../axios.config';
import { postUserDataToTheServer } from '../../redux/user/user.actions';
import Btn from '../../components/btn/btn.component';

const content = {
	logof: {
		config: {
			type: 'button',
			title: 'Log out',
			className: 'btn btn--secondary'
		}
	},
	cancel: {
		config: {
			type: 'button',
			title: 'Cancel',
			className: 'btn btn--primary'
		}
	}
};

const LogOut = (props) => {
	const { user, processing, dataFetched, status, error, postUserData } = props;
	/**
     * Single state hook useState for all the state properties
     */
	const [ fullState, setFullState ] = React.useState({
		logoutError: false,
		errorMessage: ''
	});

	const logout = () => {

		postUserData('logout', '')
			.then((res) => {
				// console.log('sign in doc, res =====> ', res);

				props.history.push('/signin');
			})
			.catch((error) => {
				// console.log('sign in doc, error =====> ', error.response);

				// resetForm();
				setFullState({
					...fullState,
					logoutError: true,
					errorMessage: error.message
				});
			});
	};

	const cancel = () => {
		console.log(props.history);
	};

	return (
		<div className="log-out">
			<h2 className="log-out__header">Do you want to log out?</h2>
			<p className="log-out__error-message">{error}</p>
			{/* <p className="log-out__error-message">{fullState.logoutError ? fullState.errorMessage : ''}</p> */}
			<div className="log-out__button-box">
				<Btn
					{...content.logof.config}
					onClick={() => {
						logout();
					}}
				/>
				<Btn
					{...content.cancel.config}
					onClick={() => {
						cancel();
					}}
				/>
			</div>
		</div>
	);
};

const mapReduxStateToProps = (state) => ({
	user: state.user.data,
	processing: state.auth.processing,
	dataFetched: state.auth.dataFetched,
	status: state.auth.status,
	error: state.auth.error
});

const mapReduxDispatchToProps = (dispatch) => ({
	postUserData: (route, values) => dispatch(postUserDataToTheServer(route, values))
});

export default connect(mapReduxStateToProps, mapReduxDispatchToProps)(LogOut);
