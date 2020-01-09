import React from 'react';
import PropTypes from 'prop-types';
import {
	View, Alert, Share, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import equal from 'deep-equal';
import moment from 'moment';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';

import RCTextInput from '../../containers/TextInput';
import ListItem from '../../containers/ListItem';
import styles from './styles';
import Markdown from '../../containers/markdown';
import RocketChat from '../../lib/rocketchat';
import Button from '../../containers/Button';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import I18n from '../../i18n';
import StatusBar from '../../containers/StatusBar';
import log from '../../utils/log';
import { themes } from '../../constants/colors';
import { withTheme } from '../../theme';
import { themedHeader } from '../../utils/navigation';

const OPTIONS = {
	days: [{
		label: 'Never', value: 0
	},
	{
		label: '1', value: 1
	},
	{
		label: '7', value: 7
	},
	{
		label: '15', value: 15
	},
	{
		label: '30', value: 30
	}],
	maxUses: [{
		label: 'No limit', value: 0
	},
	{
		label: '1', value: 1
	},
	{
		label: '5', value: 5
	},
	{
		label: '10', value: 10
	},
	{
		label: '25', value: 25
	},
	{
		label: '50', value: 50
	},
	{
		label: '100', value: 100
	}]
};

class InviteUsersView extends React.Component {
	static navigationOptions = ({ screenProps }) => ({
		title: I18n.t('Invite_users'),
		...themedHeader(screenProps.theme)
	})

	static propTypes = {
		navigation: PropTypes.object,
		theme: PropTypes.string,
		timeDateFormat: PropTypes.string
	}

	constructor(props) {
		super(props);
		this.rid = props.navigation.getParam('rid');
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	const { loading, searchText, messages } = this.state;
	// 	const { theme } = this.props;
	// 	if (nextProps.theme !== theme) {
	// 		return true;
	// 	}
	// 	if (nextState.loading !== loading) {
	// 		return true;
	// 	}
	// 	if (nextState.searchText !== searchText) {
	// 		return true;
	// 	}
	// 	if (!equal(nextState.messages, messages)) {
	// 		return true;
	// 	}
	// 	return false;
	// }

	// componentWillUnmount() {
	// 	this.search.stop();
	// }

	// onValueChangePicker = async(key, value) => {
	// 	const params = {
	// 		[key]: value.toString()
	// 	};
	// 	this.setState()
	// }

	renderPicker = (key) => {
		const { props } = this;
		const { theme } = props;
		return (
			<RNPickerSelect
				style={{ viewContainer: styles.viewContainer }}
				value={props[key]}
				textInputProps={{ style: { ...styles.pickerText, color: themes[theme].actionTintColor } }}
				useNativeAndroidPickerStyle={false}
				placeholder={{}}
				// onValueChange={value => this.onValueChangePicker(key, value)}
				items={OPTIONS[key]}
			/>
		);
	}

	render() {
		const { theme, timeDateFormat } = this.props;
		return (
			<SafeAreaView style={[styles.container, { backgroundColor: themes[theme].backgroundColor }]} forceInset={{ vertical: 'never' }}>
				<ScrollView
					{...scrollPersistTaps}
					style={{ backgroundColor: themes[theme].auxiliaryBackground }}
					contentContainerStyle={styles.contentContainer}
					showsVerticalScrollIndicator={false}
					testID='notification-preference-view-list'
				>
					<StatusBar theme={theme} />
					<ListItem
						title={I18n.t('Expiration_Days')}
						testID='notification-preference-view-alert'
						right={() => this.renderPicker('days')}
						theme={theme}
					/>
					<ListItem
						title={I18n.t('Max_number_of_uses')}
						testID='notification-preference-view-alert'
						right={() => this.renderPicker('maxUses')}
						theme={theme}
					/>
					<Button
						title={I18n.t('Edit_Invite')}
						type='primary'
						// onPress={this.resetPassword}
						theme={theme}
					/>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
	days: state.inviteLinks.days,
	maxUses: state.inviteLinks.maxUses
});

export default connect(mapStateToProps)(withTheme(InviteUsersView));
