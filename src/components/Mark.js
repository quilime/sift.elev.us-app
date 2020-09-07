import React, { useState, useEffect }  from 'react';
import { useSelector } from "react-redux";
import { Button, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
// import styled from "styled-components";


const Mark = (props) => {

  const image = props.image;

  const user = useSelector(state => state.reducers.user);
  const [marked, setMarked] = useState(false);
  const [usersWhoMarked, setUsersWhoMarked] = useState();

  

  useEffect(() => {
    
    fetch(process.env.REACT_APP_API + '/images/' + image.uuid + '/marks', {
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
      }
    })
    .then(res => res.json())
    .then(marks => {
      setMarked(marks.includes(user.username));
      setUsersWhoMarked(marks);
    });
  }, [image, user.username]);

  const markImage = async (e) => {

    const values = {
      userUUID: user.uuid,
      imageUUID: image.uuid
    };
  
    if (image) {
      let res = await fetch(process.env.REACT_APP_API + '/mark', {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(values)
        });
      let resJson = await res.json();
      if (resJson) {
  
        let m = usersWhoMarked;
        if (!resJson.marked) {
          m.pop(user.username);
        } else {
          m.push(user.username);
        }

        setUsersWhoMarked(m);  
        setMarked(resJson.marked);
      }    
    }
  }

  return (
    <div className="interaction">
      <div className="mark">
        <Tooltip title="Mark as 'Seen'">
          <Button shape="circle" onClick={markImage} disabled={ image.username === user.username } type={ marked ? "primary" : "" } icon={<EyeOutlined />} />
        </Tooltip>
        &nbsp;&nbsp;<a href={`/u/${image.username}`}>{image.username}</a>
        { usersWhoMarked && usersWhoMarked.map((userWhoMarked, k)=> {
          return (<span key={k}>,&nbsp;<a href={`/u/${userWhoMarked}`}>{userWhoMarked}</a></span>);
        })}
      </div>          
    </div> 
  );
};

export default Mark;