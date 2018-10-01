import React from 'react';
import jest from 'jest-mock';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { MiniElement } from '../src/MiniElement.js';

Enzyme.configure({ adapter: new Adapter() });

const onChangeViewMode = jest.fn();

const setup = (props = {}) => ({
  ...props,
  onChangeViewMode
});

describe('<MiniElement />', () => {
  const props = setup();
  const wrapper = shallow(
  <MiniElement {...props}>
    <div>Test</div>
  </MiniElement>
  );
  
    test('render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('initialized `state`', () => {
      expect(wrapper.state()).toEqual({
        smallViewMode: false,
        smallViewPos: {
          bottom: '0',
          right: '0'
        }
      });
    });

    test('initialized props', () => {
      const {
        onChangeViewMode, 
        initialPosition,
        miniElementStyle,
        draggable
        } = wrapper.instance().props;
      expect(draggable).toEqual(true);
      expect(miniElementStyle).toEqual({
        width: '100px',
        height: '100px'
      });
      expect(initialPosition).toEqual({
        bottom: '0',
        right: '0'
      });
      expect(onChangeViewMode).toEqual(onChangeViewMode);
    });
});
