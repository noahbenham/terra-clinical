const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur id est vel cursus. Ut fringilla lectus non consectetur molestie. Etiam luctus scelerisque metus, in tempor mi mattis ac. Phasellus vel dignissim neque. Maecenas pretium ipsum sapien, in interdum arcu congue eu. Aliquam a dictum velit. Proin feugiat mi nec urna maximus, ut convallis eros fringilla. Curabitur eleifend malesuada vestibulum. In ornare metus at libero cursus varius. Suspendisse dictum ac magna ac mollis. Aliquam et ante arcu. Nunc facilisis odio a molestie blandit.';

const chartReviewData = {
  physician1: {
    patient1: {
      sections: {
        1: {
          id: '1',
          name: 'Allergies',
          content,
        },
        2: {
          id: '2',
          name: 'Orders',
          content,
        },
        3: {
          id: '3',
          name: 'Problems',
          content,
        },
        4: {
          id: '4',
          name: 'Chief Complaint',
          content,
        },
        5: {
          id: '5',
          name: 'Histories',
          content,
        },
        6: {
          id: '6',
          name: 'Home Meds',
          content,
        },
        7: {
          id: '7',
          name: 'Section A',
          content,
        },
        8: {
          id: '8',
          name: 'Section B',
          content,
        },
        9: {
          id: '9',
          name: 'Section C',
          content,
        },
        10: {
          id: '10',
          name: 'Section D',
          content,
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
    }).then(() => copy(chartReviewData[physicianId][patientId]))
  ),
};

export default ChartReviewApi;
