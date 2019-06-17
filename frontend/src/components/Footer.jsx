import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/Footer.css';

class Footer extends React.Component {
	render() {
		return (
			<Fragment>
				<NavLink activeClassName="active" className="littleInfo" exact to="/madewith">
					made with :cœur:
				</NavLink>
				<br />
				<NavLink activeClassName="active" className="littleInfo" exact to="/CGU">
					CGU
				</NavLink>
				<br />
				<NavLink activeClassName="active" className="littleInfo" exact to="/nouscontacter">
					nous contacter
				</NavLink>
				<br />
				<NavLink activeClassName="active" className="littleInfo" exact to="/quisommesnous">
					qui sommes-nous ?
				</NavLink>
			</Fragment>
		);
	}
}

export default Footer;
