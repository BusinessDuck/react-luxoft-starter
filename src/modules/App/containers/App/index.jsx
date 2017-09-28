import React from "react";
import PropTypes from "prop-types";
import { Router } from 'react-router';
import { Provider } from "react-redux";

export class AppContainer extends React.Component {

  static propTypes = {
    routes: PropTypes.element,
    history: PropTypes.object,
    store: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
            {this.props.routes}
        </Router>
      </Provider>
    );
  }
}


