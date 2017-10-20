import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Text, View } from 'react-native';
import Button from 'react-native-button';
import { increment, total_questions } from '../actions/index';
import styles from '../Style.js';

const Entities = require('html-entities').AllHtmlEntities;

export class QuestionsScreen extends Component {
  constructor(props) {
    super(props);

    // Since we only use the questions in this component, they will be stored
    // in the component state instead of the application state (redux)
    this.state = {
      questions: [],
      current_question: 0,
      loading_message: 'Loading Questions...'
    }
  }

  componentWillMount() {
    // Using fetch to call the api instead of axios since some platforms might
    // have an issue with it
    fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
    .then((response) => response.json())
    .then((responseData) => {
      // Check the responses from the API
      switch (responseData.response_code) {
        case 2:
          this.setState({loading_message: 'There was an error loading the questions'});
          break;
        case 0:
          this.props.actions.total_questions(responseData.results.length);
          this.setState({questions: responseData.results});
          break;
        default:
          this.setState({loading_message: 'There was an error loading the questions (Unexpected response from the API)'});
      }
    })
    .catch( error => {
      this.setState({loading_message: 'There was an error loading the questions' + error});
    })
    .finally( () => {
      this.setState({loading_message: 'There was an error loading the questions (Could not connect to the API)'});
    });
  }

  // Determine what to do after the user answers a question
  onNextQuestion(answer) {
    // Convert the text string from the API to a boolean value
    let correct_answer = (this.state.questions[this.state.current_question].correct_answer == "True");

    // If they got a correct answer, change the app state
    if (answer == correct_answer) { this.props.actions.increment() }

    if (this.state.current_question >= (this.props.totals.total_questions - 1)) {
      this.props.navigation.navigate('Final');
    } else {
      this.setState({current_question: this.state.current_question + 1})
    }
  }

  render() {
    // If the questions array is empty, fetch has not returned anything yet or there was an error
    if (_.isEmpty(this.state.questions)) {
      return (
        <View style={styles.loading_container}>
          <Text style={styles.body_item}>{this.state.loading_message}</Text>
        </View>
      )
    }

    const entities = new Entities();

    return (
      <View style={styles.app_container}>
        <View style={styles.title_container}>
          <Text style={styles.title_item}>{this.state.questions[this.state.current_question].category}</Text>
        </View>
        <View style={styles.body_container}>
          <View style={styles.question_container}>
            <Text style={styles.body_item}>{entities.decode(this.state.questions[this.state.current_question].question)}</Text>
          </View>
          <View style={styles.question_num_container}>
            <Text style={styles.body_item}>{this.state.current_question + 1} / {this.props.totals.total_questions}</Text>
          </View>
        </View>
        <View style={styles.truefalse_footer_container}>
          <Button
            onPress={() => this.onNextQuestion(false)}
            containerStyle={styles.truefalse_button_container}
            style={styles.button_text}>
            FALSE
          </Button>
          <Button
            onPress={() => this.onNextQuestion(true)}
            containerStyle={styles.truefalse_button_container}
            style={styles.button_text}>
            TRUE
          </Button>
        </View>
      </View>
    );
  }
}

export const mapStateToProps = ({ totals }) => ({ totals });

export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ increment, total_questions }, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsScreen);
