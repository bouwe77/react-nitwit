import React from "react";
import axios from "axios";

import settings from "../../settings";
import UserList from "./UserList";

export default class FollowingContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      users: [],
      error: null
    };
  }

  componentDidMount = () => {
    this.getUsers();
  };

  getUsers = () => {
    axios
      .get(settings.followingUrl)
      .then(res => {
        this.setState({ isLoaded: true, users: res.data });
      })
      .catch(error => {
        console.log(error, error.request, error.response, error.config);
        this.setState({ isLoaded: true });
      });
  };

  //TODO Refactor this fucking shit
  toggleFollowing = username => {
    const previousUsers = this.state.users;

    const foundUser = this.state.users.find(u => u.user === username);

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
        console.log(error, error.request, error.response, error.config);
        this.setState({ users: previousUsers });
      });
    } else {
      const data = { user: username };
      axios.post(settings.followingUrl, data).catch(error => {
        console.log(error, error.request, error.response, error.config);
        this.setState({ users: previousUsers });
      });
    }
  };

  render() {
    return (
      <>
        <UserList users={this.state.users} toggleFollowing={this.toggleFollowing} />
      </>
    );
  }
}
