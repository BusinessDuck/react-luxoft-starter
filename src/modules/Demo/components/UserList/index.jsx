import React, {
  Component
} from "react";
import PropTypes from "prop-types";
import "./styles.scss";

export class UserListComponent extends Component {

  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
  };

  static defaultProps = {
    users: []
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <ul className="user-list">
          { this.props.users.map((user, index) => (<li key={`user-${index}`}>{user.name}</li>)) }
        </ul>
    );
  }
}
