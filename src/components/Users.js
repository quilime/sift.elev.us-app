import React, { useState, useEffect }  from 'react';
import { withRouter } from "react-router-dom";
// import { useSelector } from "react-redux";

import './Users.css'

const Users = (props) => {

  const [users, setUsers] = useState();

  useEffect(() => {
    fetch(process.env.REACT_APP_API + '/users', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(result => {
        setUsers(result);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!users || !users.length) return(null);

  return (
    <div className="Users">
    {users.map((user, key) =>
      <div className="User" key={key}>
        <a href={`/images/${user.username}`}>{user.username}</a>
      </div>
    )}
    </div>
  );
};

export default withRouter(Users);