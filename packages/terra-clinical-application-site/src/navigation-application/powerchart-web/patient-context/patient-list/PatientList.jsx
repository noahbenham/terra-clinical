import React from 'react';
import Button from 'terra-button';
import AppDelegate from 'terra-app-delegate';
import SingleSelectList from 'terra-list/lib/SingleSelectList';
import ItemView from 'terra-clinical-item-view';
import ItemDisplay from 'terra-clinical-item-display';
import Header from 'terra-clinical-header';

class PatientList extends React.Component {
  static selectPatient(patientData) {
    return () => {
      document.dispatchEvent(new CustomEvent('patientContext:patientSelected', {
        detail: { patientData },
      }));
    };
  }

  render() {
    const { dismissPatientContextDisclosure, routingManager } = this.props;

    let closeButton;
    if (dismissPatientContextDisclosure) {
      closeButton = (
        <Button
          text="Close"
          onClick={() => {
            dismissPatientContextDisclosure();
          }}
        />
      );
    }

    const layoutValue = routingManager.size === 'tiny' ? 'oneColumn' : 'twoColumns';

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
        layout={layoutValue}
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
        layout={layoutValue}
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
        layout={layoutValue}
      />
    );

    return (
      <div>
        <Header title="Patient List" endContent={closeButton} />
        <div style={{ padding: '10px' }}>
	        <SingleSelectList isDivided={true} hasChevrons={false}>
            <SingleSelectList.Item content={rambo} key="rambo" onClick={PatientList.selectPatient({ id: 3, name: 'Rambo, John' })} />
            <SingleSelectList.Item content={williams} key="williams" onClick={PatientList.selectPatient({ id: 2, name: 'Williams, Ash' })} />
            <SingleSelectList.Item content={johnson} key="johnson" onClick={PatientList.selectPatient({ id: 1, name: 'Johnson, Don' })} />
          </SingleSelectList>
        </div>
      </div>
    );
  }
}

export default PatientList;
