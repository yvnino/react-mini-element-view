import React from 'react';
import PropTypes from 'prop-types';

export class MiniElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      smallViewMode: false,
      smallViewPos: {
        ...props.initialPosition
      }
    };
    this.originalElm = null;
    this.copyElm = null;
    this.draggable = false;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll, false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isDraging && !prevState.dragging) {
      document.addEventListener('mousemove', this.onDragMove);
      document.addEventListener('mouseup', this.onDragDone);
    } else if (!this.state.isDraging && prevState.isDraging) {
      document.removeEventListener('mousemove', this.onDragMove);
      document.removeEventListener('mouseup', this.onDragDone);
    }
  }

  onScroll = () => {
    if (!this.originalElm) return false;
    const elmBounding = this.originalElm.getBoundingClientRect();
    const isvisable = this.isInViewPort(elmBounding);

    if (!this.state.smallViewMode) {
      if (!isvisable) {
        this.setState({ smallViewMode: true });
        this.props.onChangeViewMode('miniElement');
      }
    } else {
      const isRealElmVisable = this.isInViewPort(this.copyElm.getBoundingClientRect());

      if (isRealElmVisable) {
        this.setState({ smallViewMode: false });
        this.props.onChangeViewMode('originalElement');
      }
    }

    return isvisable;
  }

  onDragDone = () => {
    document.onmouseup = null;
    document.onmousemove = null;
    const { top, left } = this.originalElm.style;

    this.lastPos = { top, left };
    this.setState({ isDraging: false });
  }

  onStartDrag = (e) => {
    // eslint-disable-next-line
    e = e || window.event;
    e.preventDefault();
    this.lastClientX = e.clientX;
    this.lastClientY = e.clientY;
    this.setState({ isDraging: true });
  }

  onDragMove = (e) => {
    // eslint-disable-next-line
    e = e || window.event;
    const pos1 = this.lastClientX - e.clientX;
    const pos2 = this.lastClientY - e.clientY;
    const maxWidth = document.body.clientWidth;
    let leftPos = this.originalElm.offsetLeft - pos1;
    
    // keep the mini element inside the screen frame
    if (this.originalElm.offsetLeft - pos1 < 0) {
      leftPos = 0;
    }
    if (this.originalElm.offsetLeft - pos1 > maxWidth) {
      leftPos = maxWidth;
    }
    this.lastClientX = e.clientX;
    this.lastClientY = e.clientY;
    this.setState({
      smallViewPos: {
        top: `${(this.originalElm.offsetTop - pos2)}px`,
        left: `${leftPos}px`
      } 
    });
    e.stopPropagation();
    e.preventDefault();
  }

  isInViewPort = (bounding) => (bounding.bottom > 0 && bounding.right > 0);

  render() {
    if (this.state.smallViewMode) {
      const dragEvent = (this.props.draggable) ? {
        onMouseDown: this.onStartDrag
      } : {};

      const { smallViewPos } = this.state;

      return ( 
        <span>  
          <div className="smallWrapper" 
            { ...dragEvent } 
            style={ { 
              position: 'fixed',
               ...this.props.miniElementStyle, 
               ...smallViewPos
            } }
             ref={ (el) => { this.originalElm = el; } } >
            { 
              // eslint-disable-next-line
              this.props.children 
            }
          </div>
          <div 
            style={ {
              height: this.originalElm.offsetHeight, 
              width: this.originalElm.offsetWidth 
              } } 
            ref={ (el) => { this.copyElm = el; } } />
        </span>
      );
    }

    return (   
      <div className="noStyleDiv" style={ { width: 'fit-content', height: 'fit-content' } } ref={ (el) => { this.originalElm = el; } } >
        { this.props.children }
      </div>
    );
  }
}

MiniElement.defaultProps = {
  initialPosition: {
    bottom: '0',
    right: '0'
  },
  miniElementStyle: {
    width: '100px',
    height: '100px'
  },
  onChangeViewMode: () => {},
  draggable: true
};

MiniElement.propTypes = {
  initialPosition: PropTypes.object,
  miniElementStyle: PropTypes.object,
  onChangeViewMode: PropTypes.func,
  draggable: PropTypes.bool
};

export default MiniElement;
