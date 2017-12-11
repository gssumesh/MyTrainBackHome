import React from 'react';
import { StyleSheet, 
	Text,
	View,
	Platform} from 'react-native';

import DisruptionWidget from './widgets/DisruptionWidget';

export default class AppContent extends React.Component {

	render() {
		return (
			<View
				style={[styles.appContentContainer]}
			>
				<View style={[styles.appContentWidgetContainer]}>
					<DisruptionWidget disruptions={'03'} name={'platform'}  iconName={'directions-railway'}/>
					<View style={[styles.widgetDivider]}></View>
					<DisruptionWidget disruptions={'00'} name={'disruptions'} iconName={'notifications'}/>
				</View>
			</View >
		);
	}
}

const styles = StyleSheet.create({
	appContentContainer: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	appContentWidgetContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	widgetDivider: {
		borderColor: '#455A64',
		borderWidth: 0.5,
		marginTop: 30,
		marginBottom: 30,
	},

	textStyle: {
		textAlign: 'center',
		fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
		color: 'grey',
		backgroundColor: 'transparent',
	},
	largeText: {
		fontSize: 44,
	},
	smallText: {
		fontSize: 18,
	},

});

