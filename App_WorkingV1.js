import React from 'react';
import { StyleSheet, 
	Text, TextInput,
	View, ImageBackground, Image,
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
				const newBGColor = ['#0038A8', '#3498db','#e74c3c','#f39c12'].find(color => color != backgroundColor);
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
			<View
			  style={[styles.container, {backgroundColor: backgroundColor} ]}
			>
				<StatusBar barStyle="light-content" />
			  <ImageBackground
				  source={require("./assets/melbourne.jpg")}
		    style={[styles.imageContainer]}
		    imageStyle={[styles.image, {opacity: 0.0 }]}
		  >
							<Text style={[styles.smallText, styles.textStyle]}>
										{"Next train departs from"}	
									</Text>

						<Text style={[styles.largeText, styles.textStyle]}>
										{ destination}	
									</Text>


									<AnimatedCircularProgress
										size={200}
										width={3}
										fill={0}
										ref='circularProgress'
										tintColor="rgba(255,255,255,255)"
										onAnimationComplete={() => console.log('onAnimationComplete')}
										backgroundColor='rgba(0,0,0,0)' 
										rotation={-360}
										style={{alignSelf: 'center', paddingTop: 20, backgroundColor:'transparent'}}
									>
										{
											(fill) => (
												<View  style={styles.counter}>
												<Text style={[styles.points]} >
													{ secondsToLeave - Math.round((fill * secondsToLeave)/100) }
												</Text>
												<Text style={styles.pointsSmall}>
													{ 'Seconds' }
												</Text>
											</View>								)
										}
									</AnimatedCircularProgress>
	
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
	  paragraph: {
		      textAlign: 'center',
		    },
imageContainer: {
		flex: 1,
		      justifyContent: 'center',
},
	counter: {
			    backgroundColor: 'transparent',
		    position: 'absolute',
  
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
		    fontWeight: "200",
		    paddingTop: 20
	},
pointsSmall: {
		    backgroundColor: 'transparent',
		    position: 'absolute',
		    top: 132,
		    left: 56,
		    width: 90,
		    textAlign: 'center',
		    color: '#fff',
		    fontSize: 20,
		    fontWeight: "200",
		    paddingTop: 20
	},
textStyle: {
		textAlign: 'center',
		fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
	color: 'white',
	backgroundColor: 'transparent',
	},
	largeText: {
		fontSize: 44,
	},
	smallText: {
		fontSize: 18,
	},

});

