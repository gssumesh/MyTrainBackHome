import React from 'react';
import { StyleSheet, 
	Text, TextInput,
	View, ImageBackground, Image,
	ActivityIndicator, StatusBar,
	Platform, KeyboardAvoidingView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			error: false,
			destination: 'Melbourne',
			backgroundColor: 'rgb(0,0,0,0)',
			secondsToLeave: 100,
		};
	}

	handleUpdateDestination = async city => {
		this.setState({
			destination: city,
			secondsToLeave: 60
		});
	};


	componentDidMount() {
		this.handleUpdateDestination('South Morang');
	}

	render() {
		const { destination, secondsToLeave} = this.state;
		return (
			<View
				style={[styles.container, {backgroundColor: 'transparent'} ]}
			>
				<StatusBar barStyle="light-content" />
				<ImageBackground
					source={require("./assets/melbourne.jpg")}
					style={[styles.imageContainer]}
					imageStyle={[styles.image, {opacity: 0.0 }]}
				>
					<AppHeader destination={destination} secondsToLeave={secondsToLeave} />
					<AppContent/>
				</ImageBackground>
			</View >
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	image: {
		flexGrow:1,
		height:null,
		width:null,
		alignItems: 'center',
		justifyContent:'center',
	},
	imageContainer: {
		flex: 1,
		justifyContent: 'center',
	},

});

