import React from 'react';

import LayoutSlidePanel from '../../src/_LayoutSlidePanel';

  // /**
  //  * Whether or not the panel transitions should be animated.
  //  */
  // isAnimated: PropTypes.bool,
  // /**
  //  * Whether or not the panel should be displayed.
  //  */
  // isOpen: PropTypes.bool,
  // /**
  //  * Whether or not panel toggling is enabled.
  //  */
  // isToggleEnabled: PropTypes.bool,
  //   /**
  //  * The element to display in the main content area.
  //  */
  // children: PropTypes.element,
  // /**
  //  * The style of panel presentation. One of `overlay`, `squish`.
  //  */
  // panelBehavior: PropTypes.oneOf(['overlay', 'squish']),
  // /**
  //  * The component to display in the panel content area.
  //  */
  // panelContent: PropTypes.node,
  // /**
  //  * Current breakpoint size.
  //  */
  // size: PropTypes.string.isRequired,
  // /**
  //  * The function called when panel state changes are desired.
  //  */
  // onToggle: PropTypes.func,
  // /**
  //  * String to display on menu hover target.
  //  */
  // toggleText: PropTypes.string,

describe('LayoutSlidePanel', () => {
  it('should render without optional props', () => {
    const result = shallow((
      <LayoutSlidePanel
        size="medium"
      />
    ));
    expect(result).toMatchSnapshot();
  });

  it('should render with provided props', () => {
    const result = shallow((
      <LayoutSlidePanel
        isAnimated
        isOpen
        isToggleEnabled
        panelBehavior="overlay"
        panelContent={(
          <div>Panel Content</div>
        )}
        size="medium"
        onToggle={() => {}}
        toggleText="Test Text"
      >
        <div>Child</div>
      </LayoutSlidePanel>
    ));

    expect(result).toMatchSnapshot();
  });

  it('should render when small', () => {
    const result = shallow((
      <LayoutSlidePanel
        isAnimated
        isOpen
        isToggleEnabled
        panelBehavior="overlay"
        panelContent={(
          <div>Panel Content</div>
        )}
        size="small"
        onToggle={() => {}}
        toggleText="Test Text"
      >
        <div>Child</div>
      </LayoutSlidePanel>
    ));

    expect(result).toMatchSnapshot();
  });

  it('should render when tiny', () => {
    const result = shallow((
      <LayoutSlidePanel
        isAnimated
        isOpen
        isToggleEnabled
        panelBehavior="overlay"
        panelContent={(
          <div>Panel Content</div>
        )}
        size="tiny"
        onToggle={() => {}}
        toggleText="Test Text"
      >
        <div>Child</div>
      </LayoutSlidePanel>
    ));

    expect(result).toMatchSnapshot();
  });
});
