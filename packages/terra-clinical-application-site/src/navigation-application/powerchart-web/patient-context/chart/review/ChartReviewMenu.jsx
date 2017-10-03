import React from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import { connect } from 'react-redux';
import MenuToolbar from '../../../../common/menu-toolbar/MenuToolbar';
import { loadChartReview, focusChartReviewSection } from './actions';
import './ChartReviewMenu.scss';

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
          className="cmr-link"
          variant="link"
          key={sections[sectionId].id}
          text={sections[sectionId].name}
          onClick={() => {
            focusSection(sections[sectionId].id);
          }}
          style={{ display: 'block' }}
          isBlock
        />
      ));
    });

    return (
      <div style={{ height: '100%', width: '100%', position: 'absolute' }}>
        <ContentContainer
          header={<MenuToolbar text="Summary" routingManager={routingManager} />}
          fill
        >
          <div>
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
