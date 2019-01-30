import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
import MiniElement from 'react-mini-element-view';

const IMG_WRAPPER_STYLE = {
  borderWidth: '2px',
  borderColor: '#000000',
  borderStyle: 'solid'
};

const App = () => (
  <div style={ { height: '1800px', width: '100%' } }>
    <div style={ { color: '#0000000' } } >REACT-MINI-ELEMENT-VIEW</div>
    <br />
    <br />
    <MiniElement 
      initialPosition={ {
          right: '60px',
          bottom: '60px'
      } }
      onChangeViewMode={ (elementType) => {
        console.log('Element Type', elementType);
      } }
      miniElementStyle={ {
        width: '80px',
        height: '80px'
      } }
      draggable>
      <div style={ IMG_WRAPPER_STYLE } >
        <img
          alt="imageEx" 
          style={ { height: '100%', width: '100%' } } 
          src="./assets/count-down.gif" />
      </div>
    </MiniElement>
    <div style={ { color: '#000000' } }>
      SCROLL DOWN PLEASE
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
