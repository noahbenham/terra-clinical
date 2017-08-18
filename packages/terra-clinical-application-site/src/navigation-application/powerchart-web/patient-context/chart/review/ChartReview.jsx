import React from 'react';
import AppDelegate from 'terra-app-delegate';
import Button from 'terra-button';
import { connect } from 'react-redux';
import Header from 'terra-clinical-header';
import ContentContainer from 'terra-content-container';
import { loadChartReview, focusChartReviewSection } from './actions';

class ChartReviewModal extends React.Component {
  componentDidMount() {
    document.dispatchEvent(new CustomEvent('chartReviewModalOpened'));
  }

  render() {
    const { app } = this.props;
    return (
      <div>
        <h3>Hurray!</h3>
        <Button
          text="Close"
          onClick={() => {
            document.dispatchEvent(new CustomEvent('chartReviewModalClosed'));
            app.closeDisclosure();
          }}
        />
      </div>
    );
  }
}

AppDelegate.registerComponentForDisclosure('ChartReviewModal', ChartReviewModal);

class ChartReview extends React.Component {
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
    this.updateModalOpenedCount = this.updateModalOpenedCount.bind(this);
    this.updateModalClosedCount = this.updateModalClosedCount.bind(this);

    this.sectionMapping = {};
    this.state = {
      modalOpenedCount: 0,
      modalClosedCount: 0,
    };
  }

  componentDidMount() {
    document.addEventListener('chartReviewModalOpened', this.updateModalOpenedCount);
    document.addEventListener('chartReviewModalClosed', this.updateModalClosedCount);
  }

  componentWillUnmount() {
    document.removeEventListener('chartReviewModalOpened', this.updateModalOpenedCount);
    document.removeEventListener('chartReviewModalClosed', this.updateModalClosedCount);
  }

  updateModalOpenedCount() {
    this.setState({
      modalOpenedCount: ++this.state.modalOpenedCount,
    });
  }

  updateModalClosedCount() {
    this.setState({
      modalClosedCount: ++this.state.modalClosedCount,
    });
  }

  refresh() {
    this.props.loadChartReview();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.focusedSection && this.lastFocus !== this.props.focusedSection) {
      this.lastFocus = this.props.focusedSection;
      this.root.scrollTop = this.sectionMapping[this.props.focusedSection].offsetTop;
    }
  }

  render() {
    const { app, sections, sectionSequence } = this.props;

    const content = [];
    (sectionSequence || []).forEach((sectionId) => {
      content.push((
        <div
          key={sections[sectionId].id}
          style={{ paddingBottom: '5px' }}
          ref={(ref) => { this.sectionMapping[sections[sectionId].id] = ref; }}
        >
          <ContentContainer
            header={<Header title={sections[sectionId].name} />}
            key={sections[sectionId].id}
          >
            <div style={{ padding: '10px' }}>
              <p>{sections[sectionId].content}</p>
            </div>
          </ContentContainer>
        </div>
      ));
    });

    return (
      <div style={{ height: '100%', overflow: 'auto', padding: '10px' }} ref={(el) => { this.root = el; }}>
        <h2>Review</h2>
        <br />
        <Button
          text="Modal"
          onClick={() => {
            app.disclose({
              preferredType: 'modal',
              content: {
                key: 'CHART_REVIEW_MODAL',
                name: 'ChartReviewModal',
              },
            });
          }}
        />
        <p>Modal Opened {this.state.modalOpenedCount} times</p>
        <p>Modal Closed {this.state.modalClosedCount} times</p>
        <br />
        <br />
        <hr />
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sections: state.chartReview.sections,
  sectionSequence: state.chartReview.sectionSequence,
  focusedSection: state.chartReview.focusedSection,
});

const mapDispatchToProps = dispatch => ({
  loadChartReview: () => { dispatch(loadChartReview('physician1', 'patient1')); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartReview);
