import React from 'react';
import { StyleSheet,
	Text, TextInput,
	View, 
	Platform
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo';

export default class AppHeader extends React.Component{

	componentDidMount(){
		const {secondsToLeave} = this.props;
  }

  animateProgress(secondsToLeave){
    const progressView = this.refs.circularProgress;
    progressView ? progressView.performLinearAnimation(100, secondsToLeave * 1000): null;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.secondsToLeave != this.props.secondsToLeave){
      //alert(nextProps.secondsToLeave);

      this.animateProgress(nextProps.secondsToLeave);
    }
  }

	render(){
		const { destination, secondsToLeave} = this.props;
		return (
			<LinearGradient colors={['#ff512f', '#dd2476']} style={styles.appHeaderContainer}>
				<Text style={[styles.smallText, styles.textStyle]}>
					{"Next train departs from"}	
				</Text>

				<Text style={[styles.largeText, styles.textStyle]}>
					{destination}	
				</Text>
				<Text style={[styles.largeText, styles.textStyle]}>
					{secondsToLeave}	
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
					style={{alignSelf: 'center', alignItems: 'center', paddingTop: 20, backgroundColor:'transparent'}}
				>
					{
						(fill) => (
							<View  style={styles.counter}>
								<Text style={[styles.points]} >
									{ secondsToLeave - Math.round((fill * secondsToLeave)/100) }
								</Text>
								<Text style={styles.pointsSmall}>
									{ 'seconds' }
								</Text>
							</View>)
					}
				</AnimatedCircularProgress>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	appHeaderContainer: {
		flex: 3,
		alignItems: 'stretch',
		justifyContent: 'center',
		height: 150
	},
	counter: {
		backgroundColor: 'transparent',
		position: 'absolute',
		alignItems: 'center',	
	},
	points: {
		backgroundColor: 'transparent',
		textAlign: 'center',
		color: '#fff',
		fontSize: 72,
		fontWeight: "200",
		paddingTop: 70
	},
	pointsSmall: {
		backgroundColor: 'transparent',
		textAlign: 'center',
		color: '#fff',
		fontSize: 12,
		fontWeight: "200",
		paddingTop: 10
	},
	textStyle: {
		textAlign: 'center',
		fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
		color: 'white',
		backgroundColor: 'transparent',
	},
	largeText: {
		fontSize: 36,
	},
	smallText: {
		fontSize: 12,
	},

});
