import React from 'react';
import { Row } from 'reactstrap';
import Photo from './Photo';
import '../style/Photo.css';

class HomePage extends React.Component {
	render() {
		return (
			<Row>
				<Photo />
			</Row>
		);
	}
}

export default HomePage;
