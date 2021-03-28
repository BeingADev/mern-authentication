import React from "react";
import Nav from "./nav";

const Header = ({ userName, id }) => {
	return (
		<header className='header'>
			<strong className='logo'>Authy</strong>
			<Nav userName={userName} id={id} />
		</header>
	);
};

export default Header;
