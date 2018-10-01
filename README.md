# react-mini-element-view
React HOC for mini view of the element when it out from the screen view

## Getting Started

Follow the next steps to run the app locally:
npm run start:dev - Development env
npm run start:prod - Development prod
npm run test - Run unitests 
npm run eslint - Run static analyzer 


## Component properties

Property        |       Type         |       Description
:---------------|:-------------------|:--------------------------------
initialPosition | object  | optional; object where the mini component will appear for the first time
miniElementStyle | object  | optional; style object of the mini element view
onChangeViewMode | function  | optional; when the mini compenent appear or the original component appear
draggable | boolean  | optional; declare if the mini component view can be draggable - default true

## License

This project is licensed under the MIT License.