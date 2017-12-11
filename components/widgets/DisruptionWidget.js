import React from 'react';
import {
	Text, View,
	StyleSheet, Platform
} from 'react-native';
import { Icon, Divider} from 'react-native-elements';

export default DisruptionWidget = (props) => (
	<View style={[styles.disruptionWidgetContentContainer]}>
		<Icon name={props.iconName} iconStyle={styles.iconStyle}/>
		<View style={[styles.widgetHeaderContainer]}>
			<Text style={[styles.textStyle, styles.largeText]}>{props.disruptions}</Text>
			<Text style={[styles.textStyle, styles.ultraSmallText]}>{props.name}</Text>
		</View>
	</View>
)

const styles = StyleSheet.create({
	disruptionWidgetContentContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	widgetHeaderContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	widgetDivider: {
		borderBottomColor: '#455A64',
		height: 30
	},
	iconStyle: {
		color: '#185a9d',
		fontSize: 24,
		fontWeight: 'bold',
		paddingRight: 10,
	},
	textStyle: {
		textAlign: 'center',
		fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
		color: '#455A64',
		backgroundColor: 'transparent',
	},
	largeText: {
		fontSize: 36,
	},
	smallText: {
		fontSize: 18,
	},
	ultraSmallText: {
		fontSize:8, 
		color: '#455A64'
	}

});

