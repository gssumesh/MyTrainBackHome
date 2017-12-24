import React from 'react';
import { StyleSheet, 
	Text, TextInput,
	View, ImageBackground, Image,
	ActivityIndicator, StatusBar,
	Platform, KeyboardAvoidingView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import AppHeader from '../components/AppHeader';
import AppContent from '../components/AppContent';
import { fetchNextTrain} from '../services/trainServices';

export default class AppMain extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			error: false,
			destination: 'Melbourne',
			backgroundColor: 'rgb(0,0,0,0)',
			secondsToLeave: 0,
		};
	}

	handleUpdateDestination = async city => {
		this.setState({
			destination: city
		});
	};


  handleUpdateSecondsToLeave = secondsToLeave => {
    // alert(secondsToLeave);
		this.setState({
			secondsToLeave: secondsToLeave 
    }, () => console.log(secondsToLeave));
  };

	componentDidMount() {
    this.handleUpdateDestination('South Morang');
    fetchNextTrain(0, 5, 1155).then(data => this.handleUpdateSecondsToLeave(data.secondsToLeave));
	}

  async fetchNextTrainHandler(){
    return await fetchNextTrain(0, 5, 1155);
  }

	render() {
    const { destination, secondsToLeave} = this.state;
    //alert(secondsToLeave);
		return (
			<View
				style={[styles.container, {backgroundColor: 'transparent'} ]}
			>
				<StatusBar barStyle="light-content" />
					<AppHeader destination={destination} secondsToLeave={secondsToLeave} />
					<AppContent/>
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

