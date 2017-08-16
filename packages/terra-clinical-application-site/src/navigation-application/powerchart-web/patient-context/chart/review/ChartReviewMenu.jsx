import React from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import { connect } from 'react-redux';
import MenuToolbar from '../../../../common/menu-toolbar/MenuToolbar';
import { loadChartReview, focusChartReviewSection } from './actions';
// import './ChartMenu.scss';

class ChartReviewMenu extends React.Component {
  constructor(props) {
    super(props);

    this.updateSelectedSection = this.updateSelectedSection.bind(this);
    this.refresh = this.refresh.bind(this);

    this.state = {};
  }

  componentDidMount() {
    document.addEventListener('chartReviewSectionSelected', this.updateSelectedSection);
    this.refresh();
  }

  componentWillUnmount() {
    document.removeEventListener('chartReviewSectionSelected', this.updateSelectedSection);
  }

  refresh() {
    this.props.loadChartReview();
  }

  updateSelectedSection(event) {
    this.setState({
      selectedSection: event.detail.section,
    });
  }

  render() {
    const { routingManager, sections, sectionSequence, focusSection } = this.props;

    const sectionButtons = [];
    (sectionSequence || []).forEach((sectionId) => {
      sectionButtons.push((
        <Button
          isBlock
          variant="link"
          key={sections[sectionId].id}
          text={sections[sectionId].name}
          onClick={() => {
            focusSection(sections[sectionId].id);
          }}
        />
      ));
    });

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
            {sectionButtons}
          </div>
        </ContentContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sections: state.chartReview.sections,
  sectionSequence: state.chartReview.sectionSequence,
});

const mapDispatchToProps = dispatch => ({
  loadChartReview: () => { dispatch(loadChartReview('physician1', 'patient1')); },
  focusSection: (sectionId) => { dispatch(focusChartReviewSection(sectionId)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartReviewMenu);
