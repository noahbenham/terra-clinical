import React from 'react';
import Button from 'terra-button';
import AppDelegate from 'terra-app-delegate';
import SingleSelectList from 'terra-list/lib/SingleSelectList';
import ItemView from 'terra-clinical-item-view';
import ItemDisplay from 'terra-clinical-item-display';
import Header from 'terra-clinical-header';

class PatientSearch extends React.Component {
  constructor(props) {
    super(props);

    this.selectPatient = this.selectPatient.bind(this);
  }

  selectPatient(patientData) {
    const { app } = this.props;

    return () => {
      document.dispatchEvent(new CustomEvent('patientContext:patientSelected', {
        detail: { patientData },
      }));
      app.dismiss();
    };
  }

  render() {
    const { app } = this.props;

    let closeButton;
    if (app && app.dismiss) {
      closeButton = (
        <Button
          text="Close"
          onClick={() => {
            app.dismiss();
          }}
        />
      );
    }

    const rambo = (
      <ItemView
        displays={[
          <ItemDisplay text="Rambo, John" />,
          <ItemDisplay text="Care Position: Primary" />,
          <ItemDisplay text="Room 100A" />,
          <ItemDisplay text="Acuity: 5" />,
          <ItemDisplay text="Start Time: 08-05-2016 12:00:00" />,
          <ItemDisplay text="End Time: 08-05-2016 16:00:00" />,
        ]}
        layout="twoColumns"
      />
    );

    const williams = (
      <ItemView
        displays={[
          <ItemDisplay text="Williams, Ash" />,
          <ItemDisplay text="Care Position: Primary" />,
          <ItemDisplay text="Room 101B" />,
          <ItemDisplay text="Acuity: 5" />,
          <ItemDisplay text="Start Time: 08-05-2016 17:00:00" />,
          <ItemDisplay text="End Time: 08-05-2016 18:00:00" />,
        ]}
        layout="twoColumns"
      />
    );

    const johnson = (
      <ItemView
        displays={[
          <ItemDisplay text="Johnson, Don" />,
          <ItemDisplay text="Care Position: Primary" />,
          <ItemDisplay text="Room 103A" />,
          <ItemDisplay text="Acuity: 4" />,
          <ItemDisplay text="Start Time: 08-05-2016 18:00:00" />,
          <ItemDisplay text="End Time: 08-05-2016 19:00:00" />,
        ]}
        layout="twoColumns"
      />
    );

    return (
      <div>
        <Header title="Patient Search" endContent={closeButton} />
        <div style={{ padding: '10px' }}>
          <SingleSelectList isDivided={true} hasChevrons={false}>
            <SingleSelectList.Item content={rambo} key="rambo" onClick={this.selectPatient({ id: 3, name: 'Rambo, John' })} />
            <SingleSelectList.Item content={williams} key="williams" onClick={this.selectPatient({ id: 2, name: 'Williams, Ash' })} />
            <SingleSelectList.Item content={johnson} key="johnson" onClick={this.selectPatient({ id: 1, name: 'Johnson, Don' })} />
          </SingleSelectList>
        </div>
      </div>
    );
  }
}

const disclosureKey = 'PatientSearch';
AppDelegate.registerComponentForDisclosure(disclosureKey, PatientSearch);

export default PatientSearch;
export { disclosureKey };
