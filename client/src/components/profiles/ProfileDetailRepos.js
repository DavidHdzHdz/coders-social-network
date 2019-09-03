import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const ProfileDetailRepos = ({ githubUsername, getGithubRepos, repos, reposError }) => {
	useEffect(
		_ => {
			if (githubUsername) {
				getGithubRepos(githubUsername);
			}
		},
		[ getGithubRepos, githubUsername ]
	);

	return (
		<div className='profile-github'>
			<h2 className='text-primary my-1'>
				<i className='fab fa-github' /> Github Repos
			</h2>
			{githubUsername ? repos.length > 0 ? (
				repos.map((repo, index) => (
					<div key={index} className='repo bg-white p-1 my-1'>
						<div>
							<h4>
								<a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
									{repo.name}
								</a>
							</h4>
							<p>{repo.description}</p>
						</div>
						<div>
							<ul>
								<li className='badge badge-primary'>Stars: {repo.stargazers_count}</li>
								<li className='badge badge-dark'>Watchers: {repo.watchers_count}</li>
								<li className='badge badge-light'>Forks: {repo.forks_count}</li>
							</ul>
						</div>
					</div>
				))
			) : (
				<Fragment>
					{!reposError && <Spinner />}
					{reposError && (
						<div className='repo bg-white p-1 my-1'>
							<h3>github repositories not found for this github user</h3>
						</div>
					)}
				</Fragment>
			) : (
				<div className='repo bg-white p-1 my-1'>
					<h3> this user does't put his github info on his profile yet </h3>
				</div>
			)}
		</div>
	);
};

ProfileDetailRepos.propTypes = {
	githubUsername: PropTypes.any,
	getGithubRepos: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired,
	reposError: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	repos: state.profile.repos,
	reposError: state.profile.reposError
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileDetailRepos);
