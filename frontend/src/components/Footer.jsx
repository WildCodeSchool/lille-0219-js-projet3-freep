import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/Footer.css';

class Footer extends React.Component {
	render() {
		return (
			<footer>
				<NavLink activeClassName="active" className="littleInfo" exact to="/madewith">
					made with :cœur:
				</NavLink>
				<NavLink activeClassName="active" className="littleInfo" exact to="/CGU">
					CGU
				</NavLink>
				<NavLink activeClassName="active" className="littleInfo" exact to="/nouscontacter">
					nous contacter
				</NavLink>
				<NavLink activeClassName="active" className="littleInfo" exact to="/quisommesnous">
					qui sommes-nous ?
				</NavLink>
			</footer>
		);
	}
}

export default Footer;
