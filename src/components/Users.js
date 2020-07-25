import React, { useState, useEffect }  from 'react';
import { withRouter } from "react-router-dom";
// import { useSelector } from "react-redux";

import './Users.css'

const Users = (props) => {

  const url = process.env.REACT_APP_API + '/users';

  const [data, setData] = useState(null);
  // const [users, setUsers] = useState();

  const fetchData = async () => {
    let response = await fetch(url, {
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
      }
    });
    const json = await response.json();
    setData(json);
  }
  useEffect(() => {
    fetchData();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   fetch(process.env.REACT_APP_API + '/users', {
  //     credentials: 'include'
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       setUsers(result);
  //     })
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (!data || !data.length) return(<div>loading...</div>);
  // if (!users || !users.length) return(null);

  return (
    <div className="Users">
    {data.map((user, key) =>
      <div className="User" key={key}>
        <a href={`/images/${user.username}`}>{user.username}</a>
      </div>
    )}
    </div>
  );
};

export default withRouter(Users);