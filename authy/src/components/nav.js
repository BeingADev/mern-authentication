import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ userName, id }) => {
	return (
		<nav className='nav'>
			<ul>
				{userName && (
					<>
						<li>
							<Link to='/'>Dashboard</Link>
						</li>
						<li>
							<Link to={`/update-password/${id}`}>{userName}</Link>
						</li>
						<li>
							<Link to='/logout'>Logout</Link>
						</li>
					</>
				)}
				{!userName && (
					<>
						<li>
							<Link to='/signup'>Register</Link>
						</li>
						<li>
							<Link to='/login'>Login</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Nav;
