# react-mini-element-view
React HOC for mini view of the element when it out from the screen view

Live Demo: https://yvnino.github.io/react-mini-element-view/public/dist/

## install

```
npm install --save react-mini-element-view
```

## usage

```
import MiniElement from 'react-mini-element-view';

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
  <video />
</MiniElement>

```

## Component properties

Property        |       Type         |       Description
:---------------|:-------------------|:--------------------------------
initialPosition | object  | optional; object where the mini component will appear for the first time
miniElementStyle | object  | optional; style object of the mini element view
onChangeViewMode | function  | optional; when the mini compenent appear or the original component appear
draggable | boolean  | optional; declare if the mini component view can be draggable - default true

## License

This project is licensed under the MIT License.
