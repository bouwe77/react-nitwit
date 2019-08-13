import React from "react";
import axios from "axios";

import settings from "../../settings";
import UserList from "./UserList";

export default class FollowingContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      users: []
    };
  }

  componentDidMount = () => {
    this.getUsers();
  };

  getUsers = () => {
    axios
      .get(settings.usersUrl)
      .then(res => {
        const users = res.data;
        this.setState({ isLoaded: true, users });
      })
      .catch(error => {
        this.setState({ isLoaded: true, error });
      });
  };

  toggleFollowing = username => {
    //TODO as soon as this works: refactor!!!

    const previousUsers = this.state.users;

    const foundUser = this.state.users.find(function(u) {
      return u.user === username;
    });

    const users = this.state.users.map(user => {
      if (user.user === username) {
        return {
          ...user,
          youAreFollowing: !user.youAreFollowing
        };
      }
      return user;
    });

    this.setState({ users });

    const unfollow = foundUser.youAreFollowing;
    if (unfollow) {
      const url = `${settings.followingUrl}/${username}`;
      axios.delete(url).catch(error => {
        this.setState({ users: previousUsers, error });
      });
    } else {
      const data = { user: username };
      axios.post(settings.followingUrl, data).catch(error => {
        this.setState({ todos: previousUsers, error });
      });
    }
  };

  render() {
    return (
      <div className="container">
        <UserList users={this.state.users} toggleFollowing={this.toggleFollowing} />
      </div>
    );
  }
}
