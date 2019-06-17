import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/Footer.css';

class Footer extends React.Component {
	render() {
		return (
			<footer>
				<NavLink activeClassName="active" className="littleInfo" exact to="/madewith">
					Made with :cœur: by Wild Code School
				</NavLink>
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
