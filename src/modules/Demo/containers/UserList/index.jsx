import React, {
  Component
} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserListComponent from "../../components/UserList";
import { getUsers } from "../../redux/actions";

@connect(({ demo }) => ({
  users: demo.get("users")
}))
export class UserListContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    users: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refreshUsers();
  }

  refreshUsers = () => {
    this.props.dispatch(getUsers());
  };

  render() {
    return (
      <div>
        <button onClick={this.refreshUsers}>Refresh user list</button>
        <UserListComponent/>
      </div>
    );
  }
}
