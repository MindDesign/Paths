/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from 'react';
//import { getContentTypes } from '../../utils/contentTypes';

// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

const HomePage = () => {
  //const [result, setResult] = useState([]);
  /*
  useEffect(() => {
    consoleContentTypes();
  })*/

  return (
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <p>Happy coding</p>
    </div>
  );
};

export default HomePage;
