import React, { Component } from 'react';
import GridViewer from './helpers/GridGuide'
import Main from './containers/Main'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main/>
        {/* { (process.env.NODE_ENV === 'development') && <GridViewer /> } */}
      </div>
    );
  }
}

export default App;
