import React from 'react';

class ChartReview extends React.Component {
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
    })
  }

  render() {
    return (
      <div>
        <h2>Review</h2>
        <hr />
        <p>Selected Section: {this.state.selectedSection}</p>
      </div>
    );
  }
}

export default ChartReview;
