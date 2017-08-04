import React from 'react';
import Button from 'terra-button';
import IconChecklist from 'terra-icon/lib/icon/IconChecklist';
import IconCalendar from 'terra-icon/lib/icon/IconCalendar';
import IconSearch from 'terra-icon/lib/icon/IconSearch';
import SkinnyToolbar from './SkinnyToolbar';

const PatientContextToolbar = (props) => {
  return (
    <SkinnyToolbar buttons={
      <div style={{ display: 'inline-block' }}>
        <Button text="Patient List" icon={<IconChecklist />} size="medium" variant="link" />
        <Button text="Schedule" icon={<IconCalendar />} size="medium" variant="link" />
        <Button text="Patient Search" icon={<IconSearch />} size="medium" variant="link" />
      </div>
    } />
  )
}

export default PatientContextToolbar;
