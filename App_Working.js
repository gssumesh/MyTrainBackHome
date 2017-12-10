import React from 'react';
import { StyleSheet, 
	Text, TextInput,
	View, ImageBackground,
	ActivityIndicator, StatusBar,
	Platform, KeyboardAvoidingView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			error: false,
			destination: '',
			backgroundColor: '#f39c12',
			secondsToLeave: 100,
		};
	}

	handleUpdateDestination = async city => {
		//	if (!city) return;
		console.log('Update');
		this.setState({ loading: true }, async () => {
			try {
				const {backgroundColor} = this.state;
				const newBGColor = ['#3498db','#e74c3c','#f39c12'].find(color => color != backgroundColor);
				this.setState({
					loading: false,
					error: false,
					destination: 'Melbourne',
					backgroundColor: newBGColor,
					secondsToLeave: 60,
				}, async () => {
					this.refs.circularProgress.performLinearAnimation(100, 60000);
				});
			} catch (e) {
				this.setState({
					loading: false,
					error: true,
				});
			}
		});
	};


	componentDidMount() {
		this.handleUpdateDestination('South Morang');
	}

	render() {
		const { loading, error, destination, backgroundColor, secondsToLeave} = this.state;
		return (
			<KeyboardAvoidingView style={[ styles.container,  { flex:1,   backgroundColor: backgroundColor}]} behavior="padding">
				<StatusBar barStyle="light-content" />
				<View style={styles.detailsContainer}>
					<ImageBackground
						source={require("./assets/snow.png")}
						style={styles.imageContainer}
						imageStyle={[styles.image, {opacity: 0.3, alignItems: 'center', justifyContent:'center'}]}
					>
					<ActivityIndicator animating={loading} color="white" size="large" />
					{!loading && (
						<View style={{alignItems: 'center', justifyContent:'center'}}> 
							{error && (
								<Text style={[styles.smallText, styles.textStyle]}>
									Could not load Time Table, please try a different city.
								</Text>
							)}

							{!error && (
								<View>
	<Text style={[styles.largeText, styles.textStyle]}>
										{destination}
									</Text>
									<Text style={[styles.smallText, styles.textStyle]}>
										{"Departs in"}	
									</Text>

									<AnimatedCircularProgress
										size={200}
										width={6}
										fill={0}
										ref='circularProgress'
										tintColor="#fff"
										onAnimationComplete={() => console.log('onAnimationComplete')}
										backgroundColor={backgroundColor} 
										rotation={-360}
										style={{alignSelf: 'center', paddingTop: 20}}
									>
										{
											(fill) => (
												<Text style={styles.points}>
													{ secondsToLeave - Math.round((fill * secondsToLeave)/100) }
												</Text>
											)
										}
									</AnimatedCircularProgress>
								</View>
							)}
							<TextInput placeholder="Search any city" onChange={this.handleUpdateDestination}
								autoCorrect={false}
								placeholderTextColor="white"
								underlineColorAndroid="transparent"
								style={styles.textInput}
								clearButtonMode="always"

							/>
						</View>
					)}
					</ImageBackground>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#34495E',
	},
	detailsContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.2)',
		//	paddingHorizontal: 20,
	},
	red: {
		color: 'red',
	},
	textStyle: {
		textAlign: 'center',
		fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
		color: 'white',
	},
	largeText: {
		fontSize: 44,
	},
	smallText: {
		fontSize: 18,
	},
	textInput: {
		backgroundColor: '#666',
		color: 'white',
		height: 40,
		width: 300,
		marginTop: 20,
		marginHorizontal: 20,
		paddingHorizontal: 10,
		alignSelf: 'center',
	},
	imageContainer: {
		flex: 1,
	},
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
	},
	points: {
		    backgroundColor: 'transparent',
		    position: 'absolute',
		    top: 72,
		    left: 56,
		    width: 90,
		    textAlign: 'center',
		    color: '#fff',
		    fontSize: 50,
		    fontWeight: "100",
		    paddingTop: 20
		  },
});
