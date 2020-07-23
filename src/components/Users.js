import React, { useState, useEffect }  from 'react';
import { withRouter } from "react-router-dom";
// import { useSelector } from "react-redux";

import './Users.css' 

const Users = (props) => {

  const [users, setUsers] = useState();

  useEffect(() => {
    fetch(process.env.REACT_APP_API + '/users')
      .then(res => res.json())
      .then(users => {
        users = users.filter((user, key, array) => {
          // image.src = `${process.env.REACT_APP_IMG_HOST}/${image.href}/${image.name}`;
          // array[key] = image;
          console.log(user);
          return true;
        });
        setUsers(users)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  

  if (!users) return(null);

  return (
    <div className="Users">
    {users.map((user, key) => 
      <div className="User" key={key}>
        {user.email}<br/>
        {user.uuid}
      </div>
    )}
    </div>
  );
};

export default withRouter(Users);