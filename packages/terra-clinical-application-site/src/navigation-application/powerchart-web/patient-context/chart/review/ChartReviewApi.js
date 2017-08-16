const chartReviewData = {
  physician1: {
    patient1: {
      sections: {
        '1': {
          id: '1',
          name: 'Section 1',
          content: 'Blah blah blah',
        },
        '2': {
          id: '2',
          name: 'Section 2',
          content: 'Blah blah blah',
        },
        '3': {
          id: '3',
          name: 'Section 3',
          content: 'Blah blah blah',
        },
        '4': {
          id: '4',
          name: 'Section 4',
          content: 'Blah blah blah',
        },
        '5': {
          id: '5',
          name: 'Section 5',
          content: 'Blah blah blah',
        },
        '6': {
          id: '6',
          name: 'Section 6',
          content: 'Blah blah blah',
        },
        '7': {
          id: '7',
          name: 'Section 7',
          content: 'Blah blah blah',
        },
        '8': {
          id: '8',
          name: 'Section 8',
          content: 'Blah blah blah',
        },
        '9': {
          id: '9',
          name: 'Section 9',
          content: 'Blah blah blah',
        },
        '10': {
          id: '10',
          name: 'Section 10',
          content: 'Blah blah blah',
        },
      },
      sectionSequence: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    },
  },
};

const copy = object => JSON.parse(JSON.stringify(object));

const ChartReviewApi = {
  getChartReview: (physicianId, patientId) => (
    new Promise((resolve) => {
      setTimeout(() => { resolve(); }, 0);
    }).then(() => {
      return copy(chartReviewData[physicianId][patientId])
    })
  ),
};

export default ChartReviewApi;
