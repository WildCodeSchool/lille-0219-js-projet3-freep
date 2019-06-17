import React from 'react';
import { Heart, Target, MoreHorizontal } from 'react-feather';
import { Link } from 'react-router-dom';
import '../style/Photo.css';

import { Row, Col } from 'reactstrap';

class Photo extends React.Component {
	render() {
		return (
			<div>
				<Link to="/article/:id">
					<Col xs="6" md="4">
						<img
							src="http://static.wixstatic.com/media/a87a8e_973910fcfb134c43a01f610f9413f529.jpg"
							alt="clothes"
							className="Photo"
						/>
					</Col>
				</Link>

				<Row>
					<Heart />
					<Target />
					<MoreHorizontal />
				</Row>
			</div>
		);
	}
}

export default Photo;
