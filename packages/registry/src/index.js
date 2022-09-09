import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { List } from './components/List.js';
import { NewFilters } from './components/NewFilters.js';



const App = () => {
  const [nominees, setNominees] = useState(require('./nominees.json'));
  const [displayNominees, setDisplayNominees] = useState(nominees);

  return (
    <>
      <div id="sidebar">
        <div className="sidebar__inner" id="filters" style={{position: "relative"}}>
          <NewFilters nominees={nominees} displayNominees={displayNominees} setDisplayNominees={setDisplayNominees} />
        </div>
      </div>
      <div id="content" style={{marginLeft: "240px", minHeight:"700px"}}>
        <div id="mytable">
          <List nominees={displayNominees}/>
        </div>
      </div>
    </>
  )

}

ReactDOM.render(<App />, document.querySelector('#main-content'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
