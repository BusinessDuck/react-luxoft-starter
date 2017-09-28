import React, {
  Component
} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

@connect()
export class AppHomeContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      null
    );
  }
}
