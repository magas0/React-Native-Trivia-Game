import React, { Component } from 'react';
import { Text, View, BackHandler } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reset } from '../actions/index';
import styles from '../Style.js';
import Button from 'react-native-button';

export class FinalScreen extends Component {
  constructor(props) {
    super(props);
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress() {
    this.props.navigation.navigate('Home');
    return true;
  }

  // When the user wants to play again,
  // reset answers total and go to questions screen
  onPlayAgain = () => {
    this.props.actions.reset();
    this.props.navigation.navigate('Questions');
  }

  render() {
    return (
      <View style={styles.app_container}>
        <View style={styles.title_container}>
          <Text style={styles.title_item}>You scored {this.props.totals.answers_total} / {this.props.totals.total_questions}</Text>
        </View>
        <View style={styles.body_container}>
          <Text style={styles.body_item}>Want to try again?</Text>
        </View>
        <View style={styles.footer_container}>
          <Button
            onPress={this.onPlayAgain}
            containerStyle={styles.button_container}
            style={styles.button_text}>
            PLAY AGAIN
          </Button>
        </View>
      </View>
    )
  }
}

export const mapStateToProps = ({ totals }) => ({ totals });

export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ reset }, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(FinalScreen);
