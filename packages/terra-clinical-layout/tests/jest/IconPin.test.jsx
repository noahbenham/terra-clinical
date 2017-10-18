import React from 'react';

import IconPin from '../../src/_IconPin';

describe('IconPin', () => {
  it('should render a the icon', () => {
    const result = shallow((
      <IconPin />
    ));
    expect(result).toMatchSnapshot();
  });
});
