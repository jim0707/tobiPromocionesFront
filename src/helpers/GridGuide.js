import React, { Component } from 'react';
import '../css/gridguide.css';

class GridGuide extends Component {
  render() {
    return (
      <div id="gridguide" className="lq-gridview">
        <div className="lq-gridview__content content">
        {
          [...Array(31)].map( (item, index) => <div key={index} className="lq-gridview__column">&nbsp;</div>)
        }
        </div>
      </div>
    );
  }
}

export default GridGuide;
