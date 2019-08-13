import React from "react";

import User from "./User";

const UserList = props => {
  return (
    <div className="listitems">
      {props.users.map(user => (
        <User key={user.user} user={user} toggleFollowing={props.toggleFollowing} />
      ))}
    </div>
  );
};

export default UserList;
