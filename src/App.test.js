import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import Treemap from './components/Treemap';
import Header from './components/Header';

describe('MyComponent', () => {
  it('should render the "Treemap" component', () => {

    const wrapper = shallow(<App />);
    let counterWrapper = wrapper.find(Header);
    console.log('--', counterWrapper.length)
    // expect(1).toBe(2)
    expect(counterWrapper.find(Header)).toHaveLength(1);
  });
});

