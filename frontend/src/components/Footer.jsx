import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/Footer.css';

class Footer extends React.Component {
	render() {
		return (
			<footer className="fixed-bottom">
				<NavLink className="littleInfo">Made with love by Wild Code School</NavLink>
				<NavLink activeClassName="active" className="littleInfo" exact to="/CGU">
					CGU
				</NavLink>
				<NavLink activeClassName="active" className="littleInfo" exact to="/nouscontacter">
					Nous contacter
				</NavLink>
				<NavLink activeClassName="active" className="littleInfo" exact to="/quisommesnous">
					Qui sommes-nous ?
				</NavLink>
			</footer>
		);
	}
}

export default Footer;
