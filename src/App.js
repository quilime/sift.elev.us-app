import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import "antd/dist/antd.css";

import Nav from "./components/Nav";
import Register from "./components/Register";
import Login from "./components/Login";
import Upload from "./components/Upload";
import Settings from "./components/Settings";
import Images from "./components/Images";
import Image from "./components/Image";
import Users from "./components/Users";
import Tags from "./components/Tags";
import Dropzone from "./components/Dropzone2";

const App = (props) => {

  const user = useSelector(state => state.reducers.user)
  const dispatch = useDispatch();

  const [droppedFiles, setDroppedFiles] = useState([]);

  const onFilesAdded = f => {
    setDroppedFiles(f);
    console.log('files added', f);
  };

  useEffect(() => {
    // const getUser = async () => {
    //   const data = await fetch(process.env.REACT_APP_API + '/login', {
    //     headers: new Headers({ 'content-type': 'application/json' }),
    //     credentials: 'include'
    //   });
    //   const result = await data.json();
    //   console.log(result);
    //   // dispatch({ type: 'SET_USER', user: typeof result.user === "undefined" ? null : result.user });
    // }
    // getUser();
    fetch(process.env.REACT_APP_API + '/login', {
      headers: new Headers({ 'content-type': 'application/json' }),
      credentials: 'include'
    })
      .then(res => res.json())
      .then(result => {
        dispatch({ type: 'SET_USER', user: typeof result.user === "undefined" ? null : result.user });
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (typeof user === "undefined") {
    return(null);
  }

  if (!user) {
    return (
      <BrowserRouter>
        <div className="siteWrapper">
          <Switch>
            <Route exact path="/" render={(props) => (
              <Register />
            )}/>
            <Route exact path="/login" render={(props) => (
              <Login />
            )} />
            <Route exact path="/i/:uuid" render={(props) => (
              <Image
                edit={false}
                uuid={props.match.params.uuid}
              />
            )}/>
          </Switch>
        </div>
      </BrowserRouter>

    );
  }

  return (
    <BrowserRouter>
      <Dropzone onFilesAdded={onFilesAdded} />
      <div className="siteWrapper">
        <Nav />
        <Switch>
          <Route exact path="/"  render={(props) => (
            <Images
              url={(process.env.REACT_APP_API + '/images')}
              page={1}
              key={Math.random()}
              reload={true}
            />
          )}/>
          {/* <Route exact path="/page/:page"  render={(props) => (
            <Images
              url={(process.env.REACT_APP_API + '/images')}
              page={props.match.params.page}
            />
          )}/> */}
          <Route exact path="/tags/:tag" render={(props) => (
            <Tags />
          )}/>
          <Route exact path="/u/:username" render={(props) => (
            <Images
            url={(process.env.REACT_APP_API + '/images/for/' + props.match.params.username)}
            />
          )}/>
          <Route exact path="/i/:uuid" render={(props) => (
            <Image
              edit={true}
              uuid={props.match.params.uuid}
            />
          )}/>
          <Route exact path="/users" render={(props) => (
            <Users
              key={new Date().getTime()}
            />
          )}/>
          <Route exact path="/upload" render={(props) => (
            <Upload
              droppedFiles={droppedFiles}
            />
          )}/>
          <Route exact path="/settings" render={(props) => (
            <Settings />
          )} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
