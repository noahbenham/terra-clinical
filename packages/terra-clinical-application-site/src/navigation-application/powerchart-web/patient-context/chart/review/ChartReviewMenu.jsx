import React from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import MenuToolbar from '../../../../common/menu-toolbar/MenuToolbar';
// import './ChartMenu.scss';

class ChartReviewMenu extends React.Component {
  constructor(props) {
    super(props);

    this.updateSelectedSection = this.updateSelectedSection.bind(this);
    this.state = {};
  }

  componentDidMount() {
    document.addEventListener('chartReviewSectionSelected', this.updateSelectedSection);
  }

  componentWillUnmount() {
    document.removeEventListener('chartReviewSectionSelected', this.updateSelectedSection);
  }

  updateSelectedSection(event) {
    this.setState({
      selectedSection: event.detail.section,
    });
  }

  render() {
    const { routingManager } = this.props;

    return (
      <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'white' }}>
        <ContentContainer
          header={<MenuToolbar routingManager={routingManager} />}
          fill
        >
          <div style={{ padding: '10px' }}>
            <h3 style={{ paddingBottom: '5px', display: 'inline' }}>Summary</h3>
            <hr />
            <br />
            <p>Selected Section: {this.state && this.state.selectedSection}</p>
            <br />
            <Button
              text="Section 1"
              onClick={() => {
                document.dispatchEvent(new CustomEvent('chartReviewSectionSelected', { detail: { section: 'Section 1' } }));
              }}
            />
            <br />
            <br />
            <Button
              text="Section 2"
              onClick={() => {
                document.dispatchEvent(new CustomEvent('chartReviewSectionSelected', { detail: { section: 'Section 2' } }));
              }}
            />
            <br />
            <br />
            <Button
              text="Section 3"
              onClick={() => {
                document.dispatchEvent(new CustomEvent('chartReviewSectionSelected', { detail: { section: 'Section 3' } }));
              }}
            />
            <br />
            <br />
            <Button
              text="Section 4"
              onClick={() => {
                document.dispatchEvent(new CustomEvent('chartReviewSectionSelected', { detail: { section: 'Section 4' } }));
              }}
            />
          </div>
        </ContentContainer>
      </div>
    );
  }
}

export default ChartReviewMenu;
