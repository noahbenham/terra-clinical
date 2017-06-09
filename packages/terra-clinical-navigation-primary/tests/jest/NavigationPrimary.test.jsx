import React from 'react';
import NavigationPrimary from '../../src/NavigationPrimary';

describe('NavigationPrimary', () => {
  
  // Snapshot Tests
  it('should render a default NavigationPrimary', () => {
    const wrapper = shallow(<NavigationPrimary />);
    expect(wrapper).toMatchSnapshot();
  });

});
