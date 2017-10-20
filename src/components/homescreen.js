import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-native-button';
import styles from '../Style.js';
import { reset } from '../actions/index';

export class HomeScreen extends Component {

  componentDidMount() {
    // Reset the answer count if they came here from hitting the back button
    this.props.actions.reset()
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.app_container}>
        <View style={styles.title_container}>
          <Text style={styles.title_item}>Welcome to the Trivia Challenge!</Text>
        </View>
        <View style={styles.body_container}>
          <View>
            <Text style={styles.body_item}>You will be presented with 10 True or False questions. </Text>
          </View>
          <View style={{paddingTop: 30}}>
            <Text style={styles.body_item}>Can you score 100%? </Text>
          </View>
        </View>
        <View style={styles.footer_container}>
          <Button
            onPress={() => navigate('Questions')}
            containerStyle={styles.button_container}
            style={styles.button_text}>
            BEGIN
          </Button>
        </View>
      </View>
    )
  }
}

export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ reset }, dispatch) });

export default connect(null, mapDispatchToProps)(HomeScreen);
